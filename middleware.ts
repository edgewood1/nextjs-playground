import NextAuth from 'next-auth';
import { authConfig } from './src/auth.config';

export default NextAuth(authConfig).auth;

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // The matcher will run middleware on all routes except for static assets and the auth API.
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};