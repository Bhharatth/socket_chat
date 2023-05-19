import express from "express";
import { getUserConversation, newConversation } from "../controllers/convesation.js";
const router = express.Router();

//new conversation
router.post("/", newConversation);

//get conversation of a user
router.get("/:userId", getUserConversation);
export default router;