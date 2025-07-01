import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  secret: process.env.AUTH_SECRET, // <-- Add this line!
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          return { id: '1', name: 'Test User', email: credentials.email as string };
        }
        return null;
      },
    }),
  ],
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