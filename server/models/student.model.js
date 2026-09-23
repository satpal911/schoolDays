import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    },
    rollNumber: {
    type: String,
    required: true
    },
    image: {
    type: String
    },
    fatherName: {
    type: String,
    required: true
    },
    motherName: {
    type: String,
    required: true
    },
    dateOfBirth: {
    type: Date,
    required: true
    },
    gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
    },
    address: {
    type: String
    },
    contactNumber: {
        type: Number,
        required: true
    },
    email: {
    type: String
    },
    studentClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentClass',
        required: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    incharge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    password: {
        type: String,
        required: true
    }
},
{ timestamps: true });

studentSchema.index(
    { school: 1, studentClass: 1, section: 1, rollNumber: 1 },
    { unique: true }
);

export const Student = mongoose.model('Student', studentSchema);