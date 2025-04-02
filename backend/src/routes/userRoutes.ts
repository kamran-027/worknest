import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getUserProfile } from "../controllers/userController";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  await getUserProfile(req, res);
});

export default router;
