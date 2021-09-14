import express from "express";
import { addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid } from "../controllers/orderController.js";
import { authAdmin, protect } from "../middleware/authMiddleware.js";


const orderRouter = express.Router();

orderRouter.get("/", protect, authAdmin, getAllOrders);
orderRouter.post("/", protect, addOrderItems);
orderRouter.get("/myorders", protect, getMyOrders);
orderRouter.get("/:id", protect, getOrderById);
orderRouter.put("/:id/pay", protect, updateOrderToPaid);
orderRouter.put("/:id/deliver", protect, updateOrderToDelivered);


export default orderRouter;
