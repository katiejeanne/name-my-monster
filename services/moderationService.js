import { openai } from "../integrations/openaiClient.js";

/**
 * Returns true if the text passes the moderation check,
 * false if any category is flagged.
 *
 * @param {string} text
 * @returns {Promise<boolean>}
 */

export async function isAllowed(text) {
  const mod = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: text,
  });
  return !mod.results[0].flagged;
}
