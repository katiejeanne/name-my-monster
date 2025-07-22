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

    mistral_name,
    mistral_tokens,
    mistral_valid,
    mistral_response_time_ms,
    mistral_prompt,
    mistral_response,
  } = data;

  const stmt = db.prepare(`
    INSERT INTO monster_results (
      description,
      description_length,

      openai_name, openai_tokens, openai_valid, openai_response_time_ms, openai_prompt, openai_response,
      claude_name, claude_tokens, claude_valid, claude_response_time_ms, claude_prompt, claude_response,
      mistral_name, mistral_tokens, mistral_valid, mistral_response_time_ms, mistral_prompt, mistral_response
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
    mistral_name,
    mistral_tokens,
    mistral_valid,
    mistral_response_time_ms,
    mistral_prompt,
    mistral_response
  );
}

export function fetchAllResults() {
  const stmt = db.prepare(`
    SELECT id, description, openai_name, claude_name, mistral_name, created_at
    FROM monster_results
    ORDER BY created_at DESC
    `);
  return stmt.all();
}
