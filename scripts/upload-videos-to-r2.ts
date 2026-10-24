#!/usr/bin/env npx tsx
/**
 * ═══════════════════════════════════════════════════════════════════
 * UPLOAD VIDEOS TO CLOUDFLARE R2
 *
 * Uploads all videos from public/gallery/video/ to Cloudflare R2
 * using the S3-compatible API.
 *
 * Usage:
 *   npx tsx scripts/upload-videos-to-r2.ts
 *   npx tsx scripts/upload-videos-to-r2.ts --dry-run    # Preview only
 *   npx tsx scripts/upload-videos-to-r2.ts --filter pronite  # Upload specific files
 *
 * Required env vars (in .env or secrets/.env.production):
 *   R2_ACCOUNT_ID       - Cloudflare account ID
 *   R2_ACCESS_KEY_ID    - R2 API token access key
 *   R2_SECRET_ACCESS_KEY - R2 API token secret
 *   R2_BUCKET_NAME      - R2 bucket name
 *   R2_PUBLIC_URL       - Public URL for the bucket (custom domain or r2.dev)
 * ═══════════════════════════════════════════════════════════════════
 */

import "dotenv/config";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, basename, extname } from "path";
import { lookup } from "mime-types";

// ─────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

// Video source directory (relative to project root)
const VIDEO_SOURCE_DIR = "public/gallery/video";

// R2 destination prefix (folder structure in bucket)
const R2_PREFIX = "gallery/video/";

// Supported video extensions
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".avi", ".mkv"];

// CLI flags
const isDryRun = process.argv.includes("--dry-run");
const filterIndex = process.argv.indexOf("--filter");
const filter =
  filterIndex !== -1 && filterIndex + 1 < process.argv.length
    ? process.argv[filterIndex + 1]
    : undefined;

// ─────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("❌ Missing required environment variables:");
  console.error("   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME");
  console.error("\nAdd them to .env or secrets/.env.production");
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────
// S3 Client (Cloudflare R2)
// ─────────────────────────────────────────────────────────────────

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

async function checkIfExists(key: string): Promise<boolean> {
  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      })
    );
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(filePath: string, key: string, contentType: string): Promise<void> {
  const fileBuffer = readFileSync(filePath);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
      // Cache for 1 year (videos don't change)
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
}

// ─────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────

async function main() {
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("           CLOUDFLARE R2 VIDEO UPLOAD SCRIPT");
  console.log("═══════════════════════════════════════════════════════════════");
  console.log(`\n📁 Source: ${VIDEO_SOURCE_DIR}`);
  console.log(`☁️  Bucket: ${R2_BUCKET_NAME}`);
  console.log(`📂 Prefix: ${R2_PREFIX}`);
  if (R2_PUBLIC_URL) console.log(`🌐 Public URL: ${R2_PUBLIC_URL}`);
  if (isDryRun) console.log("\n🔍 DRY RUN MODE - No files will be uploaded\n");
  if (filter) console.log(`🔎 Filter: ${filter}\n`);

  // Get list of video files
  let files: string[];
  try {
    files = readdirSync(VIDEO_SOURCE_DIR).filter((file) => {
      const ext = extname(file).toLowerCase();
      const isVideo = VIDEO_EXTENSIONS.includes(ext);
      const matchesFilter = filter ? file.toLowerCase().includes(filter.toLowerCase()) : true;
      return isVideo && matchesFilter;
    });
  } catch (err) {
    console.error(`❌ Cannot read directory: ${VIDEO_SOURCE_DIR}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log("⚠️  No video files found to upload.");
    process.exit(0);
  }

  console.log(`\n📹 Found ${files.length} video(s) to process:\n`);

  // Calculate total size
  let totalSize = 0;
  const fileDetails = files.map((file) => {
    const filePath = join(VIDEO_SOURCE_DIR, file);
    const stats = statSync(filePath);
    totalSize += stats.size;
    return { file, filePath, size: stats.size };
  });

  console.log(`   Total size: ${formatBytes(totalSize)}\n`);

  // Upload each file
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const { file, filePath, size } of fileDetails) {
    const key = `${R2_PREFIX}${file}`;
    const contentType = lookup(file) || "video/mp4";

    process.stdout.write(`   ${file} (${formatBytes(size)}) ... `);

    if (isDryRun) {
      console.log("✓ would upload");
      uploaded++;
      continue;
    }

    try {
      // Check if file already exists
      const exists = await checkIfExists(key);
      if (exists) {
        console.log("⏭️  already exists, skipping");
        skipped++;
        continue;
      }

      // Upload
      await uploadFile(filePath, key, contentType);
      console.log("✅ uploaded");
      uploaded++;
    } catch (err) {
      console.log(`❌ failed: ${(err as Error).message}`);
      failed++;
    }
  }

  // Summary
  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log("                        SUMMARY");
  console.log("═══════════════════════════════════════════════════════════════");
  console.log(`   ✅ Uploaded: ${uploaded}`);
  console.log(`   ⏭️  Skipped:  ${skipped}`);
  console.log(`   ❌ Failed:   ${failed}`);

  if (R2_PUBLIC_URL && uploaded > 0) {
    console.log("\n📎 Public URLs:");
    for (const { file } of fileDetails) {
      console.log(`   ${R2_PUBLIC_URL}/${R2_PREFIX}${file}`);
    }
  }

  console.log("\n✨ Done!\n");

  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
