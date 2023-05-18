import AsyncHandler from "express-async-handler";
import Messages from "../models/Messages";

//create messages or add messages
export const createNewMessages = AsyncHandler(async (req, res) => {
  const { newMessage } = req.body;

  try {
    const new_message = new Messages({ newMessage });
    const savedMessages = await new_message.save();
    res.status(200).json(savedMessages);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get messages

export const getMessages = AsyncHandler(async (req, res) => {
  const { conversationId } = req.params.conversationId;

  try {
    const messages = await Messages.find({ conversationId: conversationId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json(error);
  }
});
