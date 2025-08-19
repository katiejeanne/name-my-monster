import express from "express";
import { handleNameMonster } from "../controllers/nameMonsterController.js";

const router = express.Router();

router.post("/", handleNameMonster);

export default router;
