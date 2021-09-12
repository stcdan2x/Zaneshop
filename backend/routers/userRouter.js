import express from "express";
import { authUser, deleteUser, editUser, getUserById, getUserProfile, getUsers, registerUser, updateUserProfile } from "../controllers/userController.js";
import { authAdmin, protect } from "../middleware/authMiddleware.js";


const userRouter = express.Router();

userRouter.get("/", protect, authAdmin, getUsers);
userRouter.post("/", registerUser);
userRouter.post("/login", authUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, updateUserProfile);
userRouter.delete("/:id", protect, authAdmin, deleteUser);
userRouter.get("/:id", protect, authAdmin, getUserById);
userRouter.put("/:id", protect, authAdmin, editUser);


export default userRouter;

