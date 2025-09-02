import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      default: "product",
    },
    description: {
      type: String,
      default: "best product ever",
    },
    price: {
      type: Number,
      default: 150,
    },
    discount: {
      type: Number,
      default: 0,
    },
    product_image: {
      type: Array,
    },
    userRef: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
