// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Evita múltiplas instâncias em dev (Hot Reload)
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // opcional, para debugar queries
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
export default prisma;