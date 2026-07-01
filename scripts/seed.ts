import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { admins } from "../db/schema";
import { hashPassword } from "../lib/auth";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.error("ADMIN_PASSWORD env variable not set.");
    process.exit(1);
  }

  const existing = await db.select().from(admins).where(eq(admins.username, username));
  if (existing.length > 0) {
    console.log("Admin already exists, skipping.");
    return;
  }

  const hash = await hashPassword(password);
  await db.insert(admins).values({ username, passwordHash: hash });
  console.log(`Admin user "${username}" created.`);
}

main().catch(console.error);