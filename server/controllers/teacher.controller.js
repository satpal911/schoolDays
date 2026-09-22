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

const getTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.teacher._id)
            .select('-password')
            .populate('school', 'name');
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ data: teacher });
    } catch (error) {
        console.error('Error in getTeacherProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateTeacherProfile = async (req, res) => {
    try {
        const { name, employeeId, subject, contactNumber, email, image, password } = req.body || {};
        const updates = {};
        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ message: 'Name must be a non-empty string' });
            }
            updates.name = name.trim();
        }
        if (employeeId !== undefined) updates.employeeId = employeeId;
        if (subject !== undefined) updates.subject = subject;
        if (contactNumber !== undefined) updates.contactNumber = contactNumber;
        if (email !== undefined) {
            if (typeof email !== 'string' || !email.trim()) {
                return res.status(400).json({ message: 'Email must be a non-empty string' });
            }
            updates.email = email.trim().toLowerCase();
        }
        if (image !== undefined) updates.image = image;
        if (password !== undefined) {
            if (typeof password !== 'string' || password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters' });
            }
            updates.password = await bcrypt.hash(password, 10);
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'At least one profile field is required' });
        }

        const teacher = await Teacher.findByIdAndUpdate(
            req.teacher._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password').populate('school', 'name');
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ message: 'Teacher profile updated successfully', data: teacher });
    } catch (error) {
        console.error('Error in updateTeacherProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.teacher._id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'Teacher profile deleted successfully' });
    } catch (error) {
        console.error('Error in deleteTeacherProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    addTeacher,
    loginTeacher,
    logoutTeacher,
    getTeacherProfile,
    updateTeacherProfile,
    deleteTeacherProfile
};