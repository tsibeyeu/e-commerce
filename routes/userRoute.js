import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

// Public routes — no auth needed
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/admin", adminLogin);

// Protected routes — authUser runs first, then the controller
userRouter.get("/me", authUser, getMe);
userRouter.put("/me", authUser, updateMe);
userRouter.put("/password", authUser, changePassword);

// add these two — no auth middleware needed (user is not logged in)
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
