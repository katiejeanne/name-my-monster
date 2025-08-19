import express from "express";
import rateLimit from "express-rate-limit";
import apiRoutes from "./routes/index.js";
import dotenv from "dotenv";
import { createHourlyLimit } from "./middleware/hourlyLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3000;

const nameMonsterLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    error:
      "Too many monster naming requests. Please wait a minute before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: false,
};

app.use(express.static("public"));
app.use(express.json({ limit: "1kb" }));
app.use(cors(corsOptions));

app.use("/api/name-monster", createHourlyLimit());
app.use("/api/name-monster", nameMonsterLimiter);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
