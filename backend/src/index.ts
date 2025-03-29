import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = app.get("/", (req, res) => {
  res.json({
    message: "Server is Up & running ",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
