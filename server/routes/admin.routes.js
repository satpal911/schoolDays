import express from "express";
import { loginAdmin, logoutAdmin, registerAdmin } from "../controllers/admin.controller.js";
import directorAuthentication from "../middlewares/auth.director.js";

const adminRouter = express.Router();

adminRouter.post("/register", directorAuthentication, registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);

export default adminRouter; 