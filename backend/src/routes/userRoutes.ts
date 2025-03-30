import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getAppliedJobs, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  await getUserProfile(req, res);
});

router.get("/applied-jobs", protect, async (req, res) => {
  await getAppliedJobs(req, res);
});

export default router;
