import express from "express";
import {
	addPrincipal,
	loginPrincipal,
	logoutPrincipal,
	getPrincipalProfile,
	updatePrincipalProfile,
	deletePrincipalProfile
} from "../controllers/principal.controller.js";
import adminAuthentication from "../middlewares/auth.admin.js";
import principalAuthentication from "../middlewares/auth.principal.js";
const principalRouter = express.Router();

principalRouter.post("/register", adminAuthentication, addPrincipal);
principalRouter.post("/login", loginPrincipal);
principalRouter.post("/logout", logoutPrincipal);
principalRouter.get("/profile", principalAuthentication, getPrincipalProfile);
principalRouter.patch("/profile", adminAuthentication, updatePrincipalProfile);
principalRouter.delete("/profile", adminAuthentication, deletePrincipalProfile);

export default principalRouter;