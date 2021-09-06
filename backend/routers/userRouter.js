import express from "express";
import { authUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const userRouter = express.Router();

userRouter.post("/login", authUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, updateUserProfile);
userRouter.post("/", registerUser);

export default userRouter;

