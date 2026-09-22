import express from "express";
import {
	loginDirector,
	logoutDirector,
	registerDirector,
	getDirectorProfile,
	updateDirectorProfile,
	deleteDirectorProfile
} from "../controllers/director.controller.js";
import directorAuthentication from "../middlewares/auth.director.js";

const directorRouter = express.Router();

directorRouter.post("/register", registerDirector);
directorRouter.post("/login", loginDirector);
directorRouter.post("/logout", logoutDirector);
directorRouter.get("/profile", directorAuthentication, getDirectorProfile)
directorRouter.patch("/profile", directorAuthentication, updateDirectorProfile)
directorRouter.delete("/profile", directorAuthentication, deleteDirectorProfile)
export default directorRouter;