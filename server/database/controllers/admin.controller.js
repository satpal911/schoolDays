import { Admin } from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { School } from "../models/school.model.js";

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, school } = req.body || {}

        console.log('Received request body:', req.body);
        if (!name || !email || !password || !school) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const schoolName = school.trim();
        const schoolRecord = await School.findOne({ name: schoolName });
        if (!schoolRecord) {
            return res.status(404).json({ message: `School '${schoolName}' not found` });
        }

        const formattedEmail = email.trim().toLowerCase();
        const schoolObjectId = schoolRecord._id;

        const conflictCheck = await Admin.aggregate([
            {
                $match: {
                    $or: [
                        { email: formattedEmail },
                        { school: schoolObjectId }
                    ]
                }
            }
        ]);

        if (conflictCheck.length > 0) {
            const matchedAdmin = conflictCheck[0];
            
            if (matchedAdmin.school && matchedAdmin.school.toString() === schoolObjectId.toString()) {
                return res.status(400).json({ 
                    message: 'An administrator is already registered for this school. Only one admin allowed per school.' 
                });
            }
            
            if (matchedAdmin.email === formattedEmail) {
                return res.status(400).json({ 
                    message: 'Admin with this email already exists' 
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
 
        const newAdmin = new Admin({
            name,
            email: formattedEmail,
            password: hashedPassword,
            school: schoolObjectId 
        });
        
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    }
    catch (error) {
        console.error('Error in registerAdmin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password, school } = req.body || {};

        if (!email || !password || !school) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const schoolName = school.trim();
        const schoolRecord = await School.findOne({ name: schoolName });
        if (!schoolRecord) {
            return res.status(404).json({ message: `School '${schoolName}' not found` });
        }

        const admin = await Admin.findOne({
            email: email.trim().toLowerCase(),
            school: schoolRecord._id
        });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }   

        
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Admin logged in successfully', token });


    }
    catch (error) {
        console.error('Error in loginAdmin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const logoutAdmin = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Admin logged out successfully' });
};

export { registerAdmin, loginAdmin, logoutAdmin };
