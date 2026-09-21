import express from "express";
import { addTeacher, loginTeacher, logoutTeacher } from "../controllers/teacher.controller.js";
import principalAuthentication from "../middlewares/auth.principal.js";
const teacherRouter = express.Router();

teacherRouter.post("/register", principalAuthentication, addTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.post("/logout", logoutTeacher);
export default teacherRouter;