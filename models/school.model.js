import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  affiliatedBoard: {
    type: String,
    enum: ['CBSE', 'ICSE', 'State Board'],
    required: true
  }
}, { timestamps: true });

  export const School = mongoose.model('School', schoolSchema);