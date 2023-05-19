import AsyncHandler from "express-async-handler";
import User from "../models/User.js"

//get a user
export const getUser = AsyncHandler(async (req, res) => {
  const { userId, username } = req.query;

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
