import mongoose from "mongoose";
import Job from "../models/JobModel";
import User from "../models/User";

export const getJobRecommendations = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  return Job.aggregate([
    {
      $facet: {
        userHistory: [
          { $match: { applicants: new mongoose.Types.ObjectId(userId) } }, // Applied jobs
          { $group: { _id: null, categories: { $addToSet: "$category" } } }, // Ensure categories are an array
          { $project: { _id: 0, categories: { $ifNull: ["$categories", []] } } }, // Ensure array format
        ],
        trendingJobs: [
          {
            $match: {
              createdAt: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              }, // Last 7 days
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
        ],
      },
    },
    { $unwind: { path: "$userHistory", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "jobs",
        let: { userCategories: { $ifNull: ["$userHistory.categories", []] } }, // Ensure array
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$category", "$$userCategories"], // Match jobs from applied categories
              },
              applicants: { $ne: new mongoose.Types.ObjectId(userId) }, // Exclude already applied jobs
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
        ],
        as: "categoryJobs",
      },
    },
    {
      $project: {
        recommendations: { $concatArrays: ["$trendingJobs", "$categoryJobs"] }, // Merge results
      },
    },
    { $unwind: "$recommendations" },
    { $limit: 5 },
  ]);
};
