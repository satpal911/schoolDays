import mongoose from 'mongoose';

const principalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
    employeeId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  image: {
    type: String
  }
},{ timestamps: true });

export const Principal = mongoose.model('Principal', principalSchema);