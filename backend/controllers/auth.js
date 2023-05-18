import AsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { Router } from 'express';

//register
export const register = AsyncHandler(async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});


//Login
export const Login = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return new Error("no user foound");

    const isPasswordmatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordmatch) return res.status(400).json("wrong password");

    const { password, ...otherDetails } = user._doc;
    res.status(200).json(...otherDetails);
  } catch (error) {
    throw new Error(error);
  }
});
