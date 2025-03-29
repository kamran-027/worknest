import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    //Hasing the password & adding salt before storing in DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(403).json({
        message:
          "Account locked due to multiple failed attempts. Reset your password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;

      // Lock account if failed attempts reach 5
      if (user.failedLoginAttempts >= 5) {
        user.isLocked = true;
        await user.save();

        const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
        user.unlockOTP = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Set OTP expiry (10 mins)

        await sendEmail(
          user.email,
          "🔒 Account Locked - WorkNest",
          `Your account has been locked due to multiple failed login attempts. 
          Click here to unlock: http://localhost:5000/unlock-account?email=${user.email}`
        );
      }

      await user.save();
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.isLocked = false;
    user.unlockOTP = "";
    user.otpExpiry = new Date("");
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const unlockAccount = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.failedLoginAttempts = 0;
    await user.save();

    res.json({ message: "Account unlocked successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
