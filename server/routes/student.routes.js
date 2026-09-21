import express from "express";
import { loginStudent, profile, registerStudent } from "../controllers/student.controller.js";
import teacherAuthentication from "../middlewares/auth.teacher.js";
import studentAuthentication from "../middlewares/auth.student.js";

const studentRouter = express.Router();

studentRouter.post("/register", teacherAuthentication, registerStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile/:studentId", studentAuthentication, profile);
export default studentRouter;