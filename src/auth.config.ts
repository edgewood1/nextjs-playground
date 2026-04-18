import type { NextAuthConfig } from 'next-auth';

// Edge-compatible config only — no bcrypt or prisma here
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedPage = nextUrl.pathname.startsWith('/spanish');
      if (isOnProtectedPage) {
        return isLoggedIn;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;