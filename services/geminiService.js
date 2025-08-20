import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateMonsterName(description) {
  const model = gemini.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      maxOutputTokens: 50,
      temperature: 1,
    },
  });

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
