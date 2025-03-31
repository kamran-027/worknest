import express, { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  unlockAccount,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  await registerUser(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  await loginUser(req, res);
});

router.post("/unlock", async (req: Request, res: Response) => {
  await unlockAccount(req, res);
});

export default router;
