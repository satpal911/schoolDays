import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
    subject: {
    type: String,
    enum: ['Math', 'Science', 'English', 'History', 'Geography', 'Art', 'Physical Education']
  },
  contactNumber: {
    type: Number
  },
  email: {
    type: String
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
},
{ timestamps: true });

export const Teacher = mongoose.model('Teacher', teacherSchema);