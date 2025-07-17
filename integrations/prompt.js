import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {
      role: "user",
      content:
        "provide a name for an adorable pet monster, provide only the name with no commentary",
    },
  ],
});

completion.then((result) => console.log(result.choices[0].message));
