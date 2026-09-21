import express from "express";
import { registerAdmin } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);

export default adminRouter;