import {Student} from "../models/student.model.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {School} from "../models/school.model.js";
import { studentClass as StudentClass, Section } from "../models/studentClass.model.js";

const registerStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      fatherName,
      motherName,
      dateOfBirth,
      gender,
      contactNumber,
      studentClass,
      section,
      password
    } = req.body || {};
    if(!name || !rollNumber || !fatherName || !motherName || !dateOfBirth || !gender || !contactNumber || !studentClass || !section || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if(isNaN(rollNumber)){
        return res.status(400).json({ message: 'Roll number must be a number' });       
    }
    const normalizedRollNumber = String(rollNumber).trim();
    if(!(isNaN(fatherName)) || !(isNaN(motherName))){
        return res.status(400).json({ message: 'Father and Mother names must be strings' });       
    }

    const schoolId = req.teacher.school;
    const existSchool = await School.findById(schoolId);
    if (!existSchool) {
      return res.status(404).json({ message: 'Teacher school not found' });
    }

    let existStudentClass = await StudentClass.findOne({ name: studentClass, school: schoolId });
    if (!existStudentClass) {
      existStudentClass = await StudentClass.create({ name: studentClass, school: schoolId });
    }

    const existSection = await Section.findOneAndUpdate(
      { class: existStudentClass._id, name: section },
      { $setOnInsert: { class: existStudentClass._id, name: section } },
      { new: true, upsert: true }
    );

    const existingStudent = await Student.findOne({
      school: schoolId,
      studentClass: existStudentClass._id,
      section: existSection._id,
      rollNumber: normalizedRollNumber
    });
    if (existingStudent) {
      return res.status(400).json({
        message: 'A student with this roll number already exists in this class'
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      rollNumber: normalizedRollNumber,
      fatherName,
      motherName,
      dateOfBirth,
      gender,
      contactNumber,
      school: existSchool._id,
      studentClass: existStudentClass._id,
      section: existSection._id,
      password: hashedPassword
    });

    console.log(newStudent)

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error in registerStudent:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'A student with this roll number already exists in this class and school'
      });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}

console.log(registerStudent)

const loginStudent = async (req, res) => {
  try {
    const { school, studentClass, section, rollNumber, password } = req.body;
    if(!school || !studentClass || !section || !rollNumber || !password) {
      return res.status(400).json({ message: 'School, class, section, roll number and password are required' });
    }

    const schoolRecord = await School.findOne({ name: school });
    if (!schoolRecord) {
      return res.status(400).json({ message: 'Invalid school' });
    }

    const classRecord = await StudentClass.findOne({
      name: studentClass,
      school: schoolRecord._id
    });
    if (!classRecord) {
      return res.status(400).json({ message: 'Invalid class' });
    }

    const sectionRecord = await Section.findOne({
      class: classRecord._id,
      name: section
    });
    if (!sectionRecord) {
      return res.status(400).json({ message: 'Invalid section' });
    }

    const student = await Student.findOne({
      studentClass: classRecord._id,
      section: sectionRecord._id,
      rollNumber
    });
    if (!student) {
      return res.status(400).json({ message: 'Invalid roll number or class' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in loginStudent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const profile = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (req.student._id.toString() !== studentId) {
      return res.status(403).json({ message: 'You can only view your own profile' });
    }
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const studentData = student.toObject();
    delete studentData.password;
    res.status(200).json(studentData);
  } catch (error) {
    console.error('Error in profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id)
      .select('-password')
      .populate('studentClass', 'name')
      .populate('section', 'name')
      .populate('school', 'name')
      .populate('incharge', 'name employeeId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ data: student });
  } catch (error) {
    console.error('Error in getStudentProfile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateStudentProfile = async (req, res) => {
  try {
    const {
      name,
      image,
      fatherName,
      motherName,
      dateOfBirth,
      gender,
      address,
      contactNumber,
      email,
      password
    } = req.body || {};
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (image !== undefined) updates.image = image;
    if (fatherName !== undefined) updates.fatherName = fatherName;
    if (motherName !== undefined) updates.motherName = motherName;
    if (dateOfBirth !== undefined) updates.dateOfBirth = dateOfBirth;
    if (gender !== undefined) updates.gender = gender;
    if (address !== undefined) updates.address = address;
    if (contactNumber !== undefined) updates.contactNumber = contactNumber;
    if (email !== undefined) updates.email = email;
    if (password !== undefined) {
      if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      updates.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'At least one profile field is required' });
    }

    const student = await Student.findByIdAndUpdate(
      req.student._id,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .select('-password')
      .populate('studentClass', 'name')
      .populate('school', 'name')
      .populate('incharge', 'name employeeId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student profile updated successfully', data: student });
  } catch (error) {
    console.error('Error in updateStudentProfile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteStudentProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.student._id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'Student profile deleted successfully' });
  } catch (error) {
    console.error('Error in deleteStudentProfile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export {
  registerStudent,
  loginStudent,
  profile,
  getStudentProfile,
  updateStudentProfile,
  deleteStudentProfile
};