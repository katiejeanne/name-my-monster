import db from "../config/db.js";

export function insertMonsterResult(data) {
  const {
    description,
    description_length,

    openai_name,
    openai_tokens,
    openai_valid,
    openai_response_time_ms,
    openai_prompt,
    openai_response,

    claude_name,
    claude_tokens,
    claude_valid,
    claude_response_time_ms,
    claude_prompt,
    claude_response,

    gemini_name,
    gemini_tokens,
    gemini_valid,
    gemini_response_time_ms,
    gemini_prompt,
    gemini_response,
  } = data;

  const stmt = db.prepare(`
    INSERT INTO monster_results (
      description,
      description_length,

      openai_name, openai_tokens, openai_valid, openai_response_time_ms, openai_prompt, openai_response,
      claude_name, claude_tokens, claude_valid, claude_response_time_ms, claude_prompt, claude_response,
      gemini_name, gemini_tokens, gemini_valid, gemini_response_time_ms, gemini_prompt, gemini_response
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    description,
    description_length,

    openai_name,
    openai_tokens,
    openai_valid,
    openai_response_time_ms,
    openai_prompt,
    openai_response,
    claude_name,
    claude_tokens,
    claude_valid,
    claude_response_time_ms,
    claude_prompt,
    claude_response,
    gemini_name,
    gemini_tokens,
    gemini_valid,
    gemini_response_time_ms,
    gemini_prompt,
    gemini_response
  );
}

export function fetchAllResults() {
  const stmt = db.prepare(`
    SELECT id, description, openai_name, claude_name, gemini_name, created_at
    FROM monster_results
    ORDER BY created_at DESC
    `);
  return stmt.all();
}
