import {Admin} from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import {School} from "../models/school.model.js";

const registerAdmin = async (req, res) => {
    try{
        const { name, email, password, schoolId } = req.body;
        if(!name || !email || !password || !schoolId){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if(existingAdmin){
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword
        });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    }
    catch(error){
        console.error('Error in registerAdmin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { registerAdmin };

