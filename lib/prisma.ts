import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalPrisma = globalThis as {
  prisma?: PrismaClient;
};

export const prisma =
  globalPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
    log: process.env.NODE_ENV === "development" ? ["query"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalPrisma.prisma = prisma;
}
