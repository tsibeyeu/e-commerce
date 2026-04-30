import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get("/stats", adminAuth, getAdminStats);

export default adminRouter;
