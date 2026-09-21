import {Student} from "../models/student.model.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {School} from "../models/school.model.js";
import { studentClass as StudentClass } from "../models/studentClass.model.js";

const registerStudent = async (req, res) => {
  try {
    const { name, rollNumber, fatherName, motherName, dateOfBirth, studentClass, password } = req.body || {};
    if(!name || !rollNumber || !fatherName || !motherName || !dateOfBirth || !studentClass || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if(isNaN(rollNumber)){
        return res.status(400).json({ message: 'Roll number must be a number' });       
    }
    if(!(isNaN(fatherName)) || !(isNaN(motherName))){
        return res.status(400).json({ message: 'Father and Mother names must be strings' });       
    }

    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this roll number already exists' });
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


    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      rollNumber,
      fatherName,
      motherName,
      dateOfBirth,
      school: existSchool._id,
      studentClass: existStudentClass._id,
      password: hashedPassword
    });

    console.log(newStudent)

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error in registerStudent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

console.log(registerStudent)

const loginStudent = async (req, res) => {
  try {
    const { studentClass,rollNumber, password } = req.body;
    if(!studentClass || !rollNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const classRecord = await StudentClass.findOne({ name: studentClass });
    if (!classRecord) {
      return res.status(400).json({ message: 'Invalid class' });
    }

    const student = await Student.findOne({
      studentClass: classRecord._id,
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

export { registerStudent, loginStudent, profile };