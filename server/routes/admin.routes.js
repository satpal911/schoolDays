import express from "express";
import {
	loginAdmin,
	logoutAdmin,
	registerAdmin,
	getAdminProfile,
	updateAdminProfile,
	deleteAdminProfile
} from "../controllers/admin.controller.js";
import adminAuthentication from "../middlewares/auth.admin.js";
import directorAuthentication from "../middlewares/auth.director.js";

const adminRouter = express.Router();

adminRouter.post("/register", directorAuthentication, registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.get("/profile", adminAuthentication, getAdminProfile);
adminRouter.put("/profile", adminAuthentication, updateAdminProfile);
adminRouter.delete("/profile", adminAuthentication, deleteAdminProfile);

export default adminRouter; 