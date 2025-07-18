import { insertMonsterResult } from "../models/monsterModel.js";

export function handleNameMonster(req, res) {
  const { description } = req.body;

  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Missing monster description." });
  }

  const description_length = description.length;

  // Dummy data for now
  const dummyData = {
    description,
    description_length,

    openai_name: "Grizzlebeak",
    openai_tokens: 25,
    openai_valid: true ? 1 : 0,
    openai_response_time_ms: 150,
    openai_prompt: `<<${description}>>`,
    openai_response: "Grizzlebeak",

    claude_name: "Snorfle",
    claude_tokens: 30,
    claude_valid: true ? 1 : 0,
    claude_response_time_ms: 180,
    claude_prompt: `<<${description}>>`,
    claude_response: "Snorfle",

    mistral_name: "The Destroyer",
    mistral_tokens: 28,
    mistral_valid: true ? 1 : 0,
    mistral_response_time_ms: 140,
    mistral_prompt: `<<${description}>>`,
    mistral_response: "The Destroyer",
  };

  insertMonsterResult(dummyData);

  res.json({
    message: "Monster names generated and saved.",
    names: {
      openai: dummyData.openai_name,
      claude: dummyData.claude_name,
      mistral: dummyData.mistral_name,
    },
  });
}
