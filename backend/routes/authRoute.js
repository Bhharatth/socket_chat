import { Login, register } from "../controllers/auth.js";
import express from "express";
const router = express.Router();

router.post("/login", Login);

router.post("/register", register);

export default router;