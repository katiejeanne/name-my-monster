import { isAllowed } from "../services/moderationService.js";
import { generateMonsterName } from "../services/openaiService.js";
import { insertMonsterResult } from "../models/monsterModel.js";

export async function handleNameMonster(req, res, next) {
  try {
    const { description } = req.body;
    if (!description?.trim()) {
      return res.status(400).json({ error: "Missing monster description." });
    }

    const description_length = description.length;
    const startMs = Date.now();

    // Moderation check
    const allowed = await isAllowed(description);
    if (!allowed) {
      return res.json({
        success: false,
        error:
          "Your description contained disallowed content. Please try again with a different description.",
      });
    }

    // Get name from OpenAI
    const { name, totalTokens, raw } = await generateMonsterName(description);
    const openai_response_time_ms = Date.now() - startMs;

    // Build result record
    const record = {
      description,
      description_length,

      // OpenAI
      openai_name: name,
      openai_tokens: totalTokens,
      openai_valid: 1,
      openai_response_time_ms,
      openai_prompt: `<<${description}>>`,
      openai_response: JSON.stringify(raw), // full response for later analysis

      // placeholders for other LLMs
      claude_name: null,
      claude_tokens: null,
      claude_valid: null,
      claude_response_time_ms: null,
      claude_prompt: null,
      claude_response: null,

      mistral_name: null,
      mistral_tokens: null,
      mistral_valid: null,
      mistral_response_time_ms: null,
      mistral_prompt: null,
      mistral_response: null,
    };

    await insertMonsterResult(record);

    res.json({
      success: true,
      names: {
        openai: record.openai_name,
        claude: record.claude_name,
        mistral: record.mistral_name,
      },
    });
  } catch (err) {
    next(err);
  }
}
