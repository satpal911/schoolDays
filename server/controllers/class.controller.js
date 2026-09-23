import { studentClass as StudentClass, Section } from '../models/studentClass.model.js';

const addClass = async (req, res) => {
  try {
    const { name, sections = [] } = req.body || {};

    if (!name) {
      return res.status(400).json({ message: 'Class name is required' });
    }
    if (!Array.isArray(sections) || sections.length === 0 || sections.some((section) => !section)) {
      return res.status(400).json({ message: 'Sections must be a non-empty string array' });
    }

    const school = req.principal.school;
    const existingClass = await StudentClass.findOne({ school, name });
    if (existingClass) {
      return res.status(400).json({ message: 'This class already exists in your school' });
    }

    const createdClass = await StudentClass.create({ name, school });
    const createdSections = await Section.insertMany(
      [...new Set(sections)].map((section) => ({
        name: section,
        class: createdClass._id
      }))
    );

    res.status(201).json({
      message: 'Class created successfully',
      data: {
        class: createdClass,
        sections: createdSections
      }
    });
  } catch (error) {
    console.error('Error in addClass:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'This class or section already exists' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { addClass };
