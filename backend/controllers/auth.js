import AsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { Router } from 'express';
import express from "express";

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
    res.status(400).json(error);
  }
});


//Login
export const Login = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordmatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordmatch) return res.status(400).json({ message: "Wrong password" });

    const { password, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
    // res.status(200).json("hi")
  } catch (error) {
    res.status(400).json(error)
  }
});
