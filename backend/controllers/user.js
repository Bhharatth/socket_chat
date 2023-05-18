import { Router } from "express";
const bcrypt = require("bcrypt");
import AsyncHandler from "express-async-handler";
import User from "../models/User";

//get a user
export const getUser = AsyncHandler(async (req, res) => {
  const { userId } = req.query.userId;
  const { username } = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    throw new Error(error);
  }
});
