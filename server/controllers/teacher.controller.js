import {Teacher} from "../models/teacher.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addTeacher = async (req, res) => {
    try {
        const { name, email, password, employeeId, subject, contactNumber } = req.body || {};
        if (!name || !email || !password || !employeeId || !subject) {
            return res.status(400).json({ message: 'Name, email, password, employeeId and subject are required' });
        }

        const existingTeacher = await Teacher.findOne({
            $or: [{ email: email.trim().toLowerCase() }, { employeeId }]
        });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Teacher email or employeeId already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = await Teacher.create({
            name,
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            employeeId,
            subject,
            contactNumber,
            school: req.principal.school
        });
        const teacherData = newTeacher.toObject();
        delete teacherData.password;
        res.status(201).json({
            status: 1,
            message: "Teacher added successfully",
            data: teacherData
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `Server error: ${error}`
        });
    }
};

const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: teacher._id, role: 'teacher' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        const teacherData = teacher.toObject();
        delete teacherData.password;
        res.status(200).json({
            status: 1,
            message: 'Teacher logged in successfully',
            data: teacherData,
            token
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `Server error: ${error}`
        });
    }

};

const logoutTeacher = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Teacher logged out successfully' });
    } catch (error) {
        console.error('Error in logoutTeacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { addTeacher, loginTeacher, logoutTeacher };