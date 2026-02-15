import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Some details are missing.",
      });
    }
    const user = await User.findOne({ userEmail: email });
    if (user) {
      return res.status(409).json({
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      userEmail: email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.userEmail,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error during registration.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required.",
      });
    }

    const user = await User.findOne({ userEmail: email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }

    console.log(user);

    const pWord = await bcrypt.compare(password, user.password);
    if (!pWord) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }

    console.log(pWord);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token)
    return res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
