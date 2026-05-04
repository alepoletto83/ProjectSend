import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { db } from "./db";

const MIGRATIONS_DIR = resolve(process.cwd(), "src", "lib", "migrations");

db.exec(`
  CREATE TABLE IF NOT EXISTS _migrations (
    name TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const applied = new Set(
  db.prepare("SELECT name FROM _migrations").all().map((r) => (r as { name: string }).name),
);

const files = readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.endsWith(".sql"))
  .sort();

const pending = files.filter((f) => !applied.has(f));

if (pending.length === 0) {
  console.log("no pending migrations");
  process.exit(0);
}

const insert = db.prepare("INSERT INTO _migrations (name) VALUES (?)");

for (const file of pending) {
  const sql = readFileSync(resolve(MIGRATIONS_DIR, file), "utf8");
  const tx = db.transaction(() => {
    db.exec(sql);
    insert.run(file);
  });
  tx();
  console.log(`applied ${file}`);
}

console.log(`done — ${pending.length} migration(s) applied`);
