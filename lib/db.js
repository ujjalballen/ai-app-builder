import "dotenv/config";

import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
    adapter,
    log: ["info", "info", "warn", "error"]
});


// Use globalThis to avoid creating multiple clients in dev or hot reload
const globalForPrisma = globalThis;

const database = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = database;
}

export default database;