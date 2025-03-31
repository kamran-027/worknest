import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";

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
          "Your account is locked. Please check your email to unlock it.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;

      // Lock account if failed attempts reach 5
      if (user.failedLoginAttempts >= 5) {
        user.isLocked = true;

        const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
        user.unlockOTP = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 mins

        await user.save(); // Save before sending email

        await sendEmail(
          user.email,
          "🔒 Account Locked - WorkNest",
          `Your account has been locked due to multiple failed login attempts. 
          Use this OTP to unlock your account: ${otp}`
        );

        return res.status(403).json({
          message: "Your account is locked. An OTP has been sent to unlock it.",
        });
      }

      await user.save();
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Reset failed attempts on successful login
    await User.updateOne(
      { email },
      {
        $set: { failedLoginAttempts: 0, isLocked: false },
        $unset: { unlockOTP: "", otpExpiry: "" },
      }
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

export const unlockAccount = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if OTP is valid
    if (
      user.unlockOTP !== otp ||
      !user.otpExpiry ||
      new Date() > user.otpExpiry
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Unlock account
    await User.updateOne(
      { email },
      {
        $set: { failedLoginAttempts: 0, isLocked: false },
        $unset: { unlockOTP: "", otpExpiry: "" },
      }
    );

    res.json({ message: "Account unlocked successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
