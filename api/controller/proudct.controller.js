import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({
      message: "product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      products,
    });
  } catch (error) {
    next(error);
  }
};
export const getOneProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(errorHandler(400, "Product Not Found"));
    }
    res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return next(errorHandler(400, "Product Not Found"));
    }
    res.status(200).json({
      message: "updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return next(errorHandler(400, "Product Not Found"));
    }
    res.status(200).json({
      message: "deleted successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};
