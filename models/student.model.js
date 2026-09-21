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
    enum: ['Male', 'Female', 'Other']
    },
    address: {
    type: String
    },
    contactNumber: {
        type: Number
    },
    email: {
    type: String
    },
    studentClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentClass',
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

export const Student = mongoose.model('Student', studentSchema);