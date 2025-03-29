import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({
    message: "Server is Up & running ",
  });
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
