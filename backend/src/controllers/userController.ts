import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Job from "../models/JobModel";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAppliedJobs = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;

    const jobs = await Job.find({ applicants: userId }).populate(
      "postedBy",
      "name"
    );

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applied jobs", error });
  }
};
