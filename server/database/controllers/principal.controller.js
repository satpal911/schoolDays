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
export { addPrincipal, loginPrincipal, logoutPrincipal };