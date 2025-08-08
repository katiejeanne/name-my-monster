import { gemini } from "../integrations/geminiClient.js";

/** Asks Gemini for a monster name
 * @param {string} description
 * @returns {Promise<{
 * name: string,
 * totalTokens: number,
 * raw: object
 * }>}
 */

export async function generateMonsterName(description) {
  const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a playful assistant that invents fun monster names based on a user provided 
  description. Output exactly one name, using 1 to 3 words, and no punctuation or extra text—only the raw name 
  itself.

  Suggest one concise, catchy name for this monster:

  "${description}"`;

  const response = await model.generateContent(prompt);

  const raw = response.response;
  const name = raw.text().trim() || "Unnamed Monster";
  const totalTokens = raw.usageMetadata.totalTokenCount;

  return { name, totalTokens, raw };
}
