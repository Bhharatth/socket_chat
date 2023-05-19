import AsyncHandler from "express-async-handler";
import Messages from "../models/Messages.js";

//create messages or add messages
export const createNewMessages = AsyncHandler(async (req, res) => {
  const newMessage = new Messages(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get messages

export const getMessages = AsyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Messages.find({ conversationId});
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json(error);
  }
});
