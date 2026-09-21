import {School} from '../models/school.model.js'

const addSchool = async (req, res) => {
    try {
        const { name, affiliatedBoard } = req.body;
        if (!name || !affiliatedBoard) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingSchool = await School.findOne({ name });
        if (existingSchool) {
            return res.status(400).json({ message: 'School with this name already exists' });
        }
        
        const newSchool = await School.create({ name, affiliatedBoard });
        res.status(201).json({
            status: 1,
            message: 'School added successfully',
            data: newSchool
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `Server error: ${error}`
        });
    }
};

const allSchools = async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json({
            status: 1,
            message: 'Schools retrieved successfully',
            data: schools
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `Server error: ${error}`
        });
    }
};

const getOneSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await School.findById(id);
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json({
            status: 1,
            message: 'School retrieved successfully',
            data: school
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `Server error: ${error}`
        });
    }
};

const updateSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, affiliatedBoard } = req.body;
        const updatedSchool = await School.findByIdAndUpdate(id, { name, affiliatedBoard }, {returnDocument: 'after'});
        if (!updatedSchool) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json({
            status: 1,
            message: 'School updated successfully',
            data: updatedSchool
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `Server error: ${error}`
        });
    }
};

const deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSchool = await School.findByIdAndDelete(id);
        if (!deletedSchool) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json({
            status: 1,
            message: 'School deleted successfully',
            data: deletedSchool
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `Server error: ${error}`
        });
    }
};

export { addSchool, allSchools, getOneSchool, updateSchool, deleteSchool };
