import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const getUserProducts = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({userRef:id});
    res.status(200).json({
        product
    })
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find({});

    if (!user) {
      res.status(200).json({
        message: "no data available",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const getOneUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return next(errorHandler(404, "product not found"));
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return next(errorHandler(404, "product not found"));
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(errorHandler(404, "product not found"));
    }

    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
