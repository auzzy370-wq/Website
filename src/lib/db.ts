import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL?.trim() ?? "";
const onVercel = process.env.VERCEL === "1";
const duringBuild = process.env.NEXT_PHASE === "phase-production-build";
let pool: pg.Pool | undefined;
let local: Promise<PGlite> | undefined;

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (databaseUrl !== "") {
    pool ??= new pg.Pool({
      connectionString: databaseUrl,
      max: 5,
      ssl: databaseUrl.includes("sslmode=disable") ? undefined : { rejectUnauthorized: false },
    });
    return (await pool.query(text, params)).rows as T[];
  }
  // Vercel serverless needs hosted Postgres. Allow the production *build* to finish
  // without DATABASE_URL so the project can be linked first; fail at request time.
  if (onVercel && !duringBuild) {
    throw new Error(
      "DATABASE_URL is required on Vercel. Add a Neon (or other) Postgres connection string in project env vars.",
    );
  }
  local ??= startLocal().catch((error: unknown) => {
    local = undefined;
    throw error;
  });
  return (await (await local).query<T>(text, params)).rows;
}

async function startLocal(): Promise<PGlite> {
  const db = new PGlite();
  const dir = join(process.cwd(), "migrations");
  const files = (await readdir(dir).catch(() => [])).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    await db.exec(await readFile(join(dir, file), "utf8"));
  }
  return db;
}
