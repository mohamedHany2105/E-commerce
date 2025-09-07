import Router from "express";

import {
  create,
  getAllProducts,
  getOneProduct,
  update,
  deleteProduct,
  deleteAll,
} from "../controller/proudct.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const productRouter = Router();

productRouter.post(
  "/create",
  // verifyToken,
  create
);
productRouter.get(
  "/",
  // verifyToken,
  getAllProducts
);
productRouter.get(
  "/:id",
  // verifyToken,
  getOneProduct
);
productRouter.post(
  "/update/:id",
  // verifyToken,
  update
);
productRouter.delete(
  "/delete/:id",
  // ,verifyToken,
  deleteProduct
);
productRouter.delete(
  "/delete",
  // verifyToken,
  deleteAll
);

export default productRouter;
