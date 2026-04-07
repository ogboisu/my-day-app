const mongoose = require("mongoose");

// Define the Task schema
const taskSchema = new mongoose.Schema(
  {
    // Main task title
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },

    // Optional extra details about the task
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Task grouping category
    category: {
      type: String,
      enum: ["work", "study", "personal"],
      default: "personal",
    },

    // Date the task is due
    dueDate: {
      type: String,
      required: [true, "Due date is required"],
    },

    // Time the task is due
    dueTime: {
      type: String,
      required: [true, "Due time is required"],
    },

    // Completion status
    completed: {
      type: Boolean,
      default: false,
    },

    // Position for drag-and-drop ordering
    order: {
      type: Number,
      default: 0,
    },

    // Reference to the owner of the task
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("Task", taskSchema);

taskSchema.index({ userId: 1, order: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });