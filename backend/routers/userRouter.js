import express from "express";
import { authUser, getUserProfile, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const userRouter = express.Router();

userRouter.post("/login", authUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.post("/", registerUser);

export default userRouter;

