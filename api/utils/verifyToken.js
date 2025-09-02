import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookie.access_token;
  if (!token) {
    return next(errorHandler(404, "unautherized"));
  }

  res.jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(400, "Forbidden"));
    }

    req.user = user;

    next();
  });
};
