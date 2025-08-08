import { isAllowed } from "../services/moderationService.js";
import { generateMonsterName as generateOpenaiName } from "../services/openaiService.js";
import { insertMonsterResult } from "../models/monsterModel.js";
import { generateMonsterName as generateAnthropicName } from "../services/anthropicService.js";
import { generateMonsterName as generateGeminiName } from "../services/geminiService.js";

export async function handleNameMonster(req, res, next) {
  try {
    const { description } = req.body;
    if (!description?.trim()) {
      return res.status(400).json({ error: "Missing monster description." });
    }

    const description_length = description.length;

    // Moderation check
    const allowed = await isAllowed(description);
    if (!allowed) {
      return res.json({
        success: false,
        error:
          "Your description contained disallowed content. Please try again with a different description.",
      });
    }

    // Helper function for timing API calls
    const timeApiCall = async (apiCall, description) => {
      const startMs = Date.now();
      const result = await apiCall(description);
      const response_time_ms = Date.now() - startMs;
      return { ...result, response_time_ms };
    };

    // Get names from all services in parallel with individual timing
    const [
      {
        name: openaiName,
        totalTokens: openaiTokens,
        raw: openaiRaw,
        response_time_ms: openai_response_time_ms,
      },
      {
        name: claudeName,
        totalTokens: claudeTokens,
        raw: claudeRaw,
        response_time_ms: claude_response_time_ms,
      },
      {
        name: geminiName,
        totalTokens: geminiTokens,
        raw: geminiRaw,
        response_time_ms: gemini_response_time_ms,
      },
    ] = await Promise.all([
      timeApiCall(generateOpenaiName, description),
      timeApiCall(generateAnthropicName, description),
      timeApiCall(generateGeminiName, description),
    ]);

    // Build result record
    const record = {
      description,
      description_length,

      // OpenAI
      openai_name: openaiName,
      openai_tokens: openaiTokens,
      openai_valid: 1,
      openai_response_time_ms,
      openai_prompt: `<<${description}>>`,
      openai_response: JSON.stringify(openaiRaw), // full response for later analysis

      // placeholders for other LLMs
      claude_name: claudeName,
      claude_tokens: claudeTokens,
      claude_valid: 1,
      claude_response_time_ms,
      claude_prompt: `<<${description}>>`,
      claude_response: JSON.stringify(claudeRaw),

      gemini_name: geminiName,
      gemini_tokens: geminiTokens,
      gemini_valid: 1,
      gemini_response_time_ms,
      gemini_prompt: `<<${description}>>`,
      gemini_response: JSON.stringify(geminiRaw),
    };

    await insertMonsterResult(record);

    res.json({
      success: true,
      names: {
        openai: record.openai_name,
        claude: record.claude_name,
        gemini: record.gemini_name,
      },
    });
  } catch (err) {
    next(err);
  }
}
