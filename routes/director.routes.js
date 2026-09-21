import express from "express";
import { loginDirector, registerDirector } from "../controllers/director.controller.js";

const directorRouter = express.Router();

directorRouter.post("/register", registerDirector);
directorRouter.post("/login", loginDirector);
export default directorRouter;