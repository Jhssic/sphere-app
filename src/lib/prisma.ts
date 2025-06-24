// lib/prisma.ts
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
let prisma: any = {}
try {
  // Dynamically import Prisma only if available to avoid build errors
  const { PrismaClient } = require("@prisma/client") as { PrismaClient: any }
  const globalForPrisma = global as unknown as { prisma?: any }
  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: ["query"],
    })
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
  }
} catch (err) {
  // Prisma is not available in this environment
  prisma = {}
}

export { prisma }
export default prisma
