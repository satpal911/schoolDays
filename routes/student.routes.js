import express from "express";
import { loginStudent, profile, registerStudent } from "../controllers/student.controller.js";

const studentRouter = express.Router();

studentRouter.post("/register", registerStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile/:studentId", profile);
export default studentRouter;