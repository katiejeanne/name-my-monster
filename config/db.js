import Database from "better-sqlite3";

const db = new Database("monsters.db");

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS monster_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        openai TEXT,
        claude TEXT,
        mistral TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `
).run();

export default db;
