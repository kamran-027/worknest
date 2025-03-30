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
          { $project: { category: 1, _id: 0 } }, // Extract categories
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
    { $unwind: "$userHistory" },
    {
      $lookup: {
        from: "jobs",
        let: { userCategories: "$userHistory.category" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$category", "$$userCategories"], // Find jobs in user's applied categories
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
        recommendations: { $concatArrays: ["$trendingJobs", "$categoryJobs"] }, // Combine both results
      },
    },
    { $unwind: "$recommendations" },
    { $limit: 5 }, // Get top 5 recommendations
  ]);
};
