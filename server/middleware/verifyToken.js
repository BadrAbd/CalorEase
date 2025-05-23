import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return next(createError(401, "You are not authenticated"));

    // Use a default JWT secret if environment variable isn't available
    const jwtSecret = process.env.JWT || "fitnesstrack-default-secret-key";
    const decode = jwt.verify(token, jwtSecret);
    req.user = decode;
    return next();
  } catch (err) {
    next(err);
  }
};
