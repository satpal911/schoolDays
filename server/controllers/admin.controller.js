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

const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id)
            .select('-password')
            .populate('school', 'name affiliatedBoard');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ data: admin });
    } catch (error) {
        console.error('Error in getAdminProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateAdminProfile = async (req, res) => {
    try {
        const { name, email, contactNumber, image, password } = req.body || {};
        const updates = {};

        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ message: 'Name must be a non-empty string' });
            }
            updates.name = name.trim();
        }

        if (email !== undefined) {
            if (typeof email !== 'string' || !email.trim()) {
                return res.status(400).json({ message: 'Email must be a non-empty string' });
            }
            updates.email = email.trim().toLowerCase();
        }

        if (contactNumber !== undefined) {
            updates.contactNumber = contactNumber;
        }

        if (image !== undefined) {
            updates.image = image;
        }

        if (password !== undefined) {
            if (typeof password !== 'string' || password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters' });
            }
            updates.password = await bcrypt.hash(password, 10);
        }

        if (updates.email) {
            const existingAdmin = await Admin.findOne({
                email: updates.email,
                _id: { $ne: req.admin._id }
            });
            if (existingAdmin) {
                return res.status(400).json({ message: 'Admin with this email already exists' });
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'At least one profile field is required' });
        }

        const admin = await Admin.findByIdAndUpdate(
            req.admin._id,
            { $set: updates },
            { returnDocument: "after", runValidators: true }
        ).select('-password').populate('school', 'name');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin profile updated successfully', data: admin });
    } catch (error) {
        console.error('Error in updateAdminProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.admin._id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.clearCookie('token');
        res.status(200).json({ message: 'Admin profile deleted successfully' });
    } catch (error) {
        console.error('Error in deleteAdminProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAdminProfile,
    updateAdminProfile,
    deleteAdminProfile
};
