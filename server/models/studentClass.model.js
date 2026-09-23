import mongoose from "mongoose";

const studentClassSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    required: true
  },
    school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
},
{ timestamps: true });

studentClassSchema.index({ school: 1, name: 1 }, { unique: true });

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E'],
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentClass',
    required: true
  }
});

  sectionSchema.index({ class: 1, name: 1 }, { unique: true });

  export const Section = mongoose.model('Section', sectionSchema);

export const studentClass = mongoose.model('StudentClass', studentClassSchema);