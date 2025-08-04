import { openai } from "../integrations/openaiClient.js";

/**
 * Asks OpenAI for a monster name
 * @param {string} description
 * @returns {Promise<{
 * name: string,
 * totalTokens: number,
 * row: object
 * }>}
 */

export async function generateMonsterName(description) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a playful assistant that invents fun monster names based on a user provided description.",
      },
      {
        role: "user",
        content: `Suggest one concise, catchy name for this monster:\n\n"${description}"`,
      },
    ],
    max_tokens: 12,
    temperature: 0.8,
  });

  const raw = response;
  const name = raw.choices[0].message.content.trim() || "Unnamed Monster";
  const totalTokens = raw.usage.total_tokens;

  return { name, totalTokens, raw };
}
