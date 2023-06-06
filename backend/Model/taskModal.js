import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter Task title'],
    },
    description: {
      type: String,
      required: [true, 'Please enter Task description'],
    },
    status: {
      type: String,
      required: [true, 'Please enter Task status'],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);
export default Task;
