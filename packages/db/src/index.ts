import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("DATABASE_URL is not set in environment variables");
}

export const client = postgres(connectionString || "", {
  prepare: false,
});

export const db = drizzle(client, { schema });

export * from "./schema/index";
