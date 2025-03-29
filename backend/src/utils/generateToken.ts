import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWTSecret = process.env.JWT_SECRET as string;

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWTSecret, {
    expiresIn: "30d",
  });
};

export default generateToken;
