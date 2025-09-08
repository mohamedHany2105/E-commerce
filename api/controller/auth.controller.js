
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(401, "Wrong email or password"));
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    // Remove password from user object
    const { password: pwd, ...userData } = user._doc ? user._doc : user;
    res.cookie("access_token", token, { httpOnly: true ,signed:true},).status(200).json({
      user: userData,
      message: "User signed in successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return next(errorHandler(400, "Missing information"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    if (!user) {
      return next(errorHandler(500, "User creation failed"));
    }
    // Remove password from user object
    const { password: pwd, ...userData } = user._doc ? user._doc : user;
    res.status(201).json({
      user: userData,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").json({
      message: "sign out Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const facebook = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
