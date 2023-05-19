import { getUser } from "../controllers/user.js";
import express from "express";
const router = express.Router();

router.get("/", getUser);

export default router;