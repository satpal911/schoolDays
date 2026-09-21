import {Student} from "../models/student.model.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import {School} from "../models/school.model.js";
import {studentClass} from "../models/studentClass.model.js";

const registerStudent = async (req, res) => {
  try {
    const { name, rollNumber, fatherName, motherName, dateOfBirth, school, studentClass, password } = req.body;
    if(!name || !rollNumber || !fatherName || !motherName || !dateOfBirth || !school || !studentClass || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(name, rollNumber, fatherName, motherName, dateOfBirth, school, studentClass, password   )
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

    let existSchool = await School.findOne({ name: school });
    if (!existSchool) {
        let createSchool = new School({ name: school ,
            affiliatedBoard: { $in: ['CBSE', 'ICSE', 'State Board'] }
        });
        await createSchool.save();
    }

    let existStudentClass = await studentClass.findOne({ name: studentClass });
    if (!existStudentClass) {
        let createStudentClass = new studentClass({ name: studentClass });
        await createStudentClass.save();
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      rollNumber,
      fatherName,
      motherName,
      dateOfBirth,
      school:existSchool ? existSchool._id : school,
      studentClass:existStudentClass ? existStudentClass._id : studentClass,
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

    const student = await Student.findOne($AND({studentClass}, {rollNumber}));
    if (!student) {
      return res.status(400).json({ message: 'Invalid roll number or class' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error in loginStudent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const profile = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error in profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { registerStudent, loginStudent, profile };