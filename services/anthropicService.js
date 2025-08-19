import { anthropic } from "../integrations/anthropicClient.js";

/**
 * Asks Anthropic for a monster name
 * @param {string} description
 * @returns { Promise<{
 * name: string,
 * totalTokens: number,
 * raw: object
 * }>}
 */

export async function generateMonsterName(description) {
  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 24,
    temperature: 1,
    system:
      "You are a playful assistant that invents fun monster names based on a user provided description. Output exactly one name, using 1 to 3 words, and no punctuation or extra text—only the raw name itself.",
    messages: [
      {
        role: "user",
        content: `Suggest one concise, catchy name for this monster:\n\n${description}`,
      },
    ],
  });
  const raw = response;
  const name = raw.content[0].text.trim() || "Unnamed Monster";
  const totalTokens = raw.usage.input_tokens + raw.usage.output_tokens;

  return { name, totalTokens, raw };
}
