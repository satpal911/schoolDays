import express from 'express';
import { markAttendance } from '../controllers/attendance.controller.js';
import teacherAuthentication from '../middlewares/auth.teacher.js';

const attendanceRouter = express.Router();

attendanceRouter.post('/mark', teacherAuthentication, markAttendance);

export default attendanceRouter;
