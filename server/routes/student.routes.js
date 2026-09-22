import express from "express";
import {
	loginStudent,
	profile,
	registerStudent,
	getStudentProfile,
	updateStudentProfile,
	deleteStudentProfile
} from "../controllers/student.controller.js";
import teacherAuthentication from "../middlewares/auth.teacher.js";
import studentAuthentication from "../middlewares/auth.student.js";

const studentRouter = express.Router();

studentRouter.post("/register", teacherAuthentication, registerStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", studentAuthentication, getStudentProfile);
studentRouter.patch("/profile", studentAuthentication, updateStudentProfile);
studentRouter.delete("/profile", studentAuthentication, deleteStudentProfile);
studentRouter.get("/profile/:studentId", studentAuthentication, profile);
export default studentRouter;