import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/index.js";
import { createHourlyLimit } from "./middleware/hourlyLimiter.js";
import {
  nameMonsterLimiter,
  dailyUserLimiter,
  hourlyUserLimiter,
} from "./middleware/rateLimiter.js";
import { corsOptions } from "./config/cors.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json({ limit: "1kb" }));
app.use(cors(corsOptions));

app.use("/api/name-monster", createHourlyLimit());
app.use("/api/name-monster", dailyUserLimiter);
app.use("/api/name-monster", hourlyUserLimiter);
app.use("/api/name-monster", nameMonsterLimiter);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
