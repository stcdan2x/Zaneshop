import express from "express";
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";


const orderRouter = express.Router();

orderRouter.post("/", protect, addOrderItems);
orderRouter.get("/:id", protect, getOrderById);
orderRouter.put("/:id/pay", protect, updateOrderToPaid);
orderRouter.get("/myorders", protect, getMyOrders);


export default orderRouter;
