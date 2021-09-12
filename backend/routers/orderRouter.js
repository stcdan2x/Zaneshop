import express from "express";
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";


const orderRouter = express.Router();

orderRouter.post("/", protect, addOrderItems);
orderRouter.get("/myorders", protect, getMyOrders);
orderRouter.get("/:id", protect, getOrderById);
orderRouter.put("/:id/pay", protect, updateOrderToPaid);


export default orderRouter;
