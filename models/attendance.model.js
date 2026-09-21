import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Leave', 'Half Day Leave', 'Holiday'],
        required: true,
        default: 'Present'
    }
}, { timestamps: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);