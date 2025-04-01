import mongoose from "mongoose";
import Job from "../models/JobModel";
import User from "../models/User";

export const getJobRecommendations = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const recommendations = await Job.aggregate([
    {
      $facet: {
        userHistory: [
          { $match: { applicants: new mongoose.Types.ObjectId(userId) } },
          { $group: { _id: null, categories: { $addToSet: "$category" } } },
          { $project: { _id: 0, categories: { $ifNull: ["$categories", []] } } },
        ],
        trendingJobs: [
          {
            $match: {
              createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
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
        let: { userCategories: { $ifNull: ["$userHistory.categories", []] } },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$category", "$$userCategories"] },
              applicants: { $ne: new mongoose.Types.ObjectId(userId) },
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
        recommendations: { $concatArrays: ["$trendingJobs", "$categoryJobs"] },
      },
    },
    { $unwind: "$recommendations" }, // Flatten the recommendations array
    { $replaceRoot: { newRoot: "$recommendations" } }, // Extract job objects directly
    { $limit: 5 },
  ]);

  return recommendations;
};
