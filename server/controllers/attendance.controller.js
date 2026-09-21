import { Attendance } from '../models/attendance.model.js';
import { Student } from '../models/student.model.js';

const markAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body || {};
        if (!studentId || !status) {
            return res.status(400).json({ message: 'studentId and status are required' });
        }

        const student = await Student.findOne({ _id: studentId, school: req.teacher.school });
        if (!student) {
            return res.status(404).json({ message: 'Student not found in your school' });
        }

        const attendance = await Attendance.create({
            student: student._id,
            date: date || new Date(),
            status
        });

        res.status(201).json({
            status: 1,
            message: 'Attendance marked successfully',
            data: attendance
        });
    } catch (error) {
        console.error('Error in markAttendance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { markAttendance };
