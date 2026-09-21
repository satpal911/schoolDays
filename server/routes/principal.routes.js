import express from "express";
import { addPrincipal, loginPrincipal, logoutPrincipal } from "../controllers/principal.controller.js";
import adminAuthentication from "../middlewares/auth.admin.js";
const principalRouter = express.Router();

principalRouter.post("/register", adminAuthentication, addPrincipal);
principalRouter.post("/login", loginPrincipal);
principalRouter.post("/logout", logoutPrincipal);

export default principalRouter;