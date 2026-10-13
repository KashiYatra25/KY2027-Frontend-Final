import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { EnhancedSession } from "./helper/types/index";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const isProduction = process.env.NODE_ENV === "production";

const authenticatedUser = {
  role: null,
  accountStatus: null,
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  cookies: {
    sessionToken: {
      name: isProduction ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
        // Uncomment for subdomain sharing in production:
        // domain: isProduction ? ".kashiyatra.com" : undefined,
      },
    },
    callbackUrl: {
      name: isProduction ? "__Secure-next-auth.callback-url" : "next-auth.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
      },
    },
    csrfToken: {
      name: isProduction ? "__Host-next-auth.csrf-token" : "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
      },
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        // ═══════════════════════════════════════════════════════════════
        // SEC-001 FIX: Send Google ID token for server-side verification
        //
        // BEFORE (VULNERABLE):
        // - Sent user.id, user.email from client
        // - Backend trusted this data blindly
        // - Attacker could spoof any user
        //
        // AFTER (SECURE):
        // - Send account.id_token (Google-signed JWT)
        // - Backend verifies with Google's servers
        // - Extracts verified user data server-side
        // ═══════════════════════════════════════════════════════════════

        const idToken = account.id_token;

        if (!idToken) {
          console.error("No ID token received from Google");
          return false;
        }

        try {
          const response = await fetch(`${BACKEND_URL}/api/v1/user/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken, // Only send the Google ID token
            }),
          });

          if (response.ok || response.status === 409) {
            const userData = await response.json();
            authenticatedUser.role = userData.role;
            authenticatedUser.accountStatus = userData.accountStatus;
            return true;
          }

          console.error("Auth failed:", await response.text());
          return false;
        } catch (err) {
          console.error("Auth error:", err);
          return false;
        }
      }
      return false;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        (session as EnhancedSession).user.role = authenticatedUser.role!;
        (session as EnhancedSession).user.accountStatus = authenticatedUser.accountStatus!;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
