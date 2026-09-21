import express from "express";
import { loginDirector, logoutDirector, registerDirector } from "../controllers/director.controller.js";

const directorRouter = express.Router();

directorRouter.post("/register", registerDirector);
directorRouter.post("/login", loginDirector);
directorRouter.post("/logout", logoutDirector);
export default directorRouter;