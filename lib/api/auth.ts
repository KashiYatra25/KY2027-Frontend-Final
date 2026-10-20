import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Cross-subdomain auth config (works in beta without NODE_ENV=production).
// Secure cookies whenever the site is served over HTTPS (detected via NEXTAUTH_URL).
// COOKIE_DOMAIN (e.g. ".kashiyatra.org") lets the session cookie be shared with the
// API subdomain (api.kashiyatra.org); leave it unset on localhost.
const useSecureCookies = (process.env.NEXTAUTH_URL ?? "").startsWith("https://");
const cookieDomain = process.env.COOKIE_DOMAIN || undefined;
const sessionCookieName = useSecureCookies
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  cookies: {
    sessionToken: {
      name: sessionCookieName,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        // Shared across *.kashiyatra.org so the API subdomain receives it.
        domain: cookieDomain,
      },
    },
    callbackUrl: {
      name: useSecureCookies ? "__Secure-next-auth.callback-url" : "next-auth.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      // __Host- prefix forbids a domain attribute; CSRF cookie is frontend-only
      // and does not need to be shared with the backend, so leave it host-scoped.
      name: useSecureCookies ? "__Host-next-auth.csrf-token" : "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
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
            // Store role, accountStatus, and isPaidUser on user object for jwt callback
            user.role = userData.role?.level ?? "USER";
            user.accountStatus = userData.accountStatus ?? "ACTIVE";
            user.isPaidUser = userData.isPaidUser ?? false;
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
      // Initial sign in - user object is available
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = user.role ?? "USER";
        token.accountStatus = user.accountStatus ?? "ACTIVE";
        token.isPaidUser = user.isPaidUser ?? false;
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
        session.user.role =
          (token.role as "MANAGER" | "OPERATOR" | "MASTER_ADMIN" | "USER") ?? "USER";
        session.user.accountStatus = (token.accountStatus as "ACTIVE" | "SUSPENDED") ?? "ACTIVE";
        session.user.isPaidUser = (token.isPaidUser as boolean) ?? false;
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
