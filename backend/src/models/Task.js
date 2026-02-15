import mongoose from "mongoose";

// 1 -> Create a schema
// 2 -> Create a model based off of that schema

const taskSchema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      required: true,
      trim: true
    },

    taskDesc: {
      type: String,
      required: true,
      trim: true
    },

    dueDate: { type: Date },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    user: {
      type: mongoose.Schema.Types.ObjectId, // stores user's _id
      ref: "User", // refers to the User model
      required: true
    },

    status: {
      type: String,
      enum: ["new", "active", "in progress", "completed"],
      default: "new"
    },
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
