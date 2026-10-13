# ImageKit Image Upload Workflow

## Overview

All images in this project are served from ImageKit CDN for optimal performance. Before using any image in the codebase, it must be:

1. Added to the `public/` folder
2. Registered in the upload config
3. Uploaded to ImageKit
4. Referenced via the `IMAGES` constant

## Step-by-Step Process

### 1. Add Image to Public Folder

Place your image in the appropriate subfolder under `public/`:

```
public/
├── home/
│   ├── hero/          # Hero section images
│   ├── footer/        # Footer images
│   ├── banarasiVibes/ # Banarasi Vibes section
│   └── ...
├── about/             # About page images
├── sponsors/          # Sponsor logos
├── navbar/            # Navbar backgrounds/badges
└── ...
```

### 2. Register Image in Upload Config

Add the image to `scripts/imagekit/images.ts`:

```typescript
{
  localFile: "home/hero/YourImage.png",      // Path relative to public/
  remoteName: "your-image.png",               // Name on ImageKit (kebab-case)
  folder: "/hero/common",                     // ImageKit folder path
},
```

### 3. Upload to ImageKit

Run the upload script:

```bash
# Upload all new images (skips existing)
npx tsx scripts/upload-to-imagekit.ts

# Force re-upload (overwrites existing)
npx tsx scripts/upload-to-imagekit.ts --force

# Preview without uploading
npx tsx scripts/upload-to-imagekit.ts --dry-run

# Upload only specific images (filter by pattern)
npx tsx scripts/upload-to-imagekit.ts --filter hero
```

### 4. Add to IMAGES Constant

Update `lib/images.ts` with the ImageKit URL:

```typescript
export const IMAGES = {
  hero: {
    yourImage: `${IMAGEKIT_BASE}/hero/common/your-image.png`,
    // ...
  },
};
```

### 5. Use in Components

Import and use the image:

```tsx
import { IMAGES } from "@/lib/images";

<Image src={IMAGES.hero.yourImage} alt="Description" />;
```

## Folder Organization

ImageKit folders mirror the project structure:

- `/hero/common/` - Hero section (both mobile & desktop)
- `/hero/desktop/` - Hero desktop-only
- `/hero/mobile/` - Hero mobile-only
- `/vibes/common/` - Banarasi Vibes section
- `/navbar/main/` - Main navbar assets
- `/about/` - About page
- `/sponsors/` - Sponsor logos
- etc.

## Environment Variables Required

```env
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_xxx
IMAGEKIT_PRIVATE_KEY=private_xxx
```

## Important Notes

- Always use kebab-case for `remoteName`
- Keep `localFile` paths relative to `public/`
- Use `--force` flag when re-uploading updated images
- Check `lib/images.ts` for existing image URL patterns
