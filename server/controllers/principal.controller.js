import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Principal } from '../models/principal.model.js';
import { School } from '../models/school.model.js';

const addPrincipal = async (req, res) => {
    try {
        const { name, password, employeeId } = req.body || {};
        if(!name || !password || !employeeId){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const principal = new Principal({
            name,
            password: hashedPassword,
            school: req.admin.school,
            employeeId
        });
        await principal.save();
        res.status(201).json({ message: 'Principal added successfully' });
    } catch (error) {
        console.error('Error in addPrincipal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginPrincipal = async (req, res) => {
    try {
        const { employeeId, password } = req.body;
        if (!employeeId || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const principal = await Principal.findOne({ employeeId });
        if (!principal) {
            return res.status(404).json({ message: 'Principal not found' });
        }

        const isMatch = await bcrypt.compare(password, principal.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: principal._id, role: 'principal' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Principal logged in successfully', token });
    } catch (error) {
        console.error('Error in loginPrincipal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logoutPrincipal = async(req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Principal logged out successfully' });
    } catch (error) {
        console.error('Error in logoutPrincipal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getPrincipalProfile = async (req, res) => {
    try {
        const principal = await Principal.findById(req.principal._id)
            .select('-password')
            .populate('school', 'name');
        if (!principal) {
            return res.status(404).json({ message: 'Principal not found' });
        }

        res.status(200).json({ data: principal });
    } catch (error) {
        console.error('Error in getPrincipalProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updatePrincipalProfile = async (req, res) => {
    try {
        const { name, employeeId, image, password } = req.body || {};
        const updates = {};

        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ message: 'Name must be a non-empty string' });
            }
            updates.name = name.trim();
        }
        if (employeeId !== undefined) {
            if (typeof employeeId !== 'string' || !employeeId.trim()) {
                return res.status(400).json({ message: 'Employee ID must be a non-empty string' });
            }
            updates.employeeId = employeeId.trim();
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

        const principal = await Principal.findByIdAndUpdate(
            req.principal._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password').populate('school', 'name');

        if (!principal) {
            return res.status(404).json({ message: 'Principal not found' });
        }
        res.status(200).json({ message: 'Principal profile updated successfully', data: principal });
    } catch (error) {
        console.error('Error in updatePrincipalProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deletePrincipalProfile = async (req, res) => {
    try {
        const principal = await Principal.findByIdAndDelete(req.principal._id);
        if (!principal) {
            return res.status(404).json({ message: 'Principal not found' });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'Principal profile deleted successfully' });
    } catch (error) {
        console.error('Error in deletePrincipalProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    addPrincipal,
    loginPrincipal,
    logoutPrincipal,
    getPrincipalProfile,
    updatePrincipalProfile,
    deletePrincipalProfile
};