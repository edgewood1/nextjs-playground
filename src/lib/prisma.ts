import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance.
// This is necessary to prevent re-creating the client on every hot-reload in development.
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a new Prisma client instance, or use the existing one if it's already on the global object.
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;