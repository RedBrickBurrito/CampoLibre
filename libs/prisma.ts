import { PrismaClient } from "@prisma/client" // Import PrismaClient from @prisma/client for database access

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma // Set global prisma in non-production environment

export default prisma
