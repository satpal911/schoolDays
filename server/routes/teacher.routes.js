import express from "express";
import {
	addTeacher,
	loginTeacher,
	logoutTeacher,
	getTeacherProfile,
	updateTeacherProfile,
	deleteTeacherProfile
} from "../controllers/teacher.controller.js";
import principalAuthentication from "../middlewares/auth.principal.js";
import teacherAuthentication from "../middlewares/auth.teacher.js";
const teacherRouter = express.Router();

teacherRouter.post("/register", principalAuthentication, addTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.post("/logout", logoutTeacher);
teacherRouter.get("/profile", teacherAuthentication, getTeacherProfile);
teacherRouter.patch("/profile", teacherAuthentication, updateTeacherProfile);
teacherRouter.delete("/profile", teacherAuthentication, deleteTeacherProfile);
export default teacherRouter;