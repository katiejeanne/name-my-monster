import express from "express";
import db from "./config/db.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(express.json());

app.post("/api/name-monster", (req, res) => {
  const { description } = req.body;
  console.log("Received monster description: ", description);

  res.json({
    names: {
      openai: "Grizzlebeak",
      claude: "Snorfle",
      mistral: "Vexclaw",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
