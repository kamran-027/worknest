import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getJobById,
  getJobs,
  recommendJobs,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  saveJob,
  getSavedJobs,
  getAppliedJobs,
} from "../controllers/jobController";

const router = express.Router();

router.get("/recommendations", protect, async (req, res) => {
  await recommendJobs(req, res);
}); // Get recommended jobs

router.get("/", protect, async (req, res) => {
  await getJobs(req, res);
}); // Get all jobs

router.get("/saved-jobs", protect, async (req, res) => {
  await getSavedJobs(req, res); //Save a job
}); //Get saved jobs

router.get("/applied-jobs", protect, async (req, res) => {
  await getAppliedJobs(req, res);
}); //Gets Applied Jobs

router.get("/:id", protect, async (req, res) => {
  await getJobById(req, res);
}); // Get job by ID

router.post("/", protect, async (req, res) => {
  await createJob(req, res);
}); // Create a job

router.put("/:id", protect, async (req, res) => {
  await updateJob(req, res);
}); // Update a job

router.delete("/:id", protect, async (req, res) => {
  await deleteJob(req, res);
}); // Delete a job

router.post("/:jobId/apply", protect, async (req, res) => {
  await applyToJob(req, res);
}); //Apply to job

router.post("/:jobId/save", protect, async (req, res) => {
  await saveJob(req, res); //Save a job
});

export default router;
