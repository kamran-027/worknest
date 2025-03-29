import express, { Request, Response } from "express";
import { registerUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  await registerUser(req, res);
});

export default router;
