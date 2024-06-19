import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { UserType } from "../types/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserType | null;
    }
  }
}

const verify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.split(" ")[1]; // Assuming token is in the format 'Bearer <token>'

  try {
    if (!token) {
      throw Error;
    }
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
