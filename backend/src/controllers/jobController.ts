import { Request, Response } from "express";
import { getJobRecommendations } from "../services/jobService";
import { AuthRequest } from "../middleware/authMiddleware";
import Job from "../models/JobModel";

export const recommendJobs = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const jobs = await getJobRecommendations(userId);

    res.json({ recommendations: jobs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recommendations", error });
  }
};

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const { title, company, description, category, location } = req.body;

    const newJob = await Job.create({
      title,
      company,
      description,
      category,
      location,
      postedBy: req.user._id, // Employer who posted the job
    });

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } }, // Case-insensitive search in title
          { company: { $regex: search, $options: "i" } }, // Search in company
          { location: { $regex: search, $options: "i" } }, // Search in location
        ],
      };
    }

    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ message: "Job not found" });

    // Ensure the job is deleted only by the employer who posted it
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this job" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

export const applyToJob = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id; // Extracted from JWT token

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if user has already applied
    if (job.applicants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    // Add user to applicants list
    job.applicants.push(userId);
    await job.save();

    return res.json({ message: "Application successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
