import express from "express";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";
import { authAdmin, protect } from "../middleware/authMiddleware.js";


const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", protect, authAdmin, createProduct);
productRouter.post("/:id/reviews", protect, createProductReview);
productRouter.put("/:id", protect, authAdmin, updateProduct);
productRouter.delete("/:id", protect, authAdmin, deleteProduct);
productRouter.get("/:id", getProductById);

export default productRouter;