import OpenAI from "openai";
import dotenv from dotenv;

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function isAllowed(text) {
  const mod = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: text,
  });
  return !mod.results[0].flagged;
}
