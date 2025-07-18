import Database from "better-sqlite3";

const db = new Database("monsters.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS monster_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    description TEXT NOT NULL,
    description_length INTEGER NOT NULL,

    openai_name TEXT,
    openai_tokens INTEGER,
    openai_valid BOOLEAN,
    openai_response_time_ms INTEGER,
    openai_votes INTEGER DEFAULT 0,
    openai_prompt TEXT,
    openai_response TEXT,

    claude_name TEXT,
    claude_tokens INTEGER,
    claude_valid BOOLEAN,
    claude_response_time_ms INTEGER,
    claude_votes INTEGER DEFAULT 0,
    claude_prompt TEXT,
    claude_response TEXT,

    mistral_name TEXT,
    mistral_tokens INTEGER,
    mistral_valid BOOLEAN,
    mistral_response_time_ms INTEGER,
    mistral_votes INTEGER DEFAULT 0,
    mistral_prompt TEXT,
    mistral_response TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
).run();

export default db;
