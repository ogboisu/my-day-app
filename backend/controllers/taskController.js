// backend/controllers/taskController.js

const Task = require("../models/Task");
const mongoose = require("mongoose");

/**
 * @desc    Get all tasks for the logged-in user
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id })
      .sort({ order: 1, createdAt: 1 })
      .lean(); // ✅ performance boost

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching tasks",
      error: error.message,
    });
  }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res) => {
  try {
    let { title, description, category, dueDate, dueTime } = req.body;

    // ✅ Validation
    if (!title || !dueDate || !dueTime) {
      return res.status(400).json({
        message: "Title, due date, and due time are required",
      });
    }

    // ✅ Sanitize inputs
    title = title.trim();
    description = description ? description.trim() : "";

    const allowedCategories = ["work", "study", "personal"];
    category = allowedCategories.includes(category) ? category : "personal";

    // ✅ Get next order efficiently
    const lastTask = await Task.findOne({ userId: req.user.id })
      .sort({ order: -1 })
      .lean();

    const nextOrder = lastTask ? lastTask.order + 1 : 0;

    const task = await Task.create({
      title,
      description,
      category,
      dueDate,
      dueTime,
      completed: false,
      order: nextOrder,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error creating task",
      error: error.message,
    });
  }
};

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOne({
      _id: taskId,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const allowedUpdates = [
      "title",
      "description",
      "category",
      "dueDate",
      "dueTime",
      "completed",
    ];

    // ✅ Only update allowed fields
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : req.body[field];
      }
    });

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error updating task",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error deleting task",
      error: error.message,
    });
  }
};

/**
 * @desc    Reorder tasks after drag-and-drop
 * @route   PATCH /api/tasks/reorder
 * @access  Private
 */
const reorderTasks = async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!Array.isArray(tasks)) {
      return res.status(400).json({
        message: "Tasks payload must be an array",
      });
    }

    // ✅ Prepare bulk update (FAST)
    const bulkOps = tasks.map((item) => {
      if (!mongoose.Types.ObjectId.isValid(item.id)) {
        throw new Error(`Invalid task ID: ${item.id}`);
      }

      return {
        updateOne: {
          filter: { _id: item.id, userId: req.user.id },
          update: { $set: { order: item.order } },
        },
      };
    });

    // ✅ Execute all updates in one DB call
    await Task.bulkWrite(bulkOps);

    const updatedTasks = await Task.find({ userId: req.user.id })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    res.status(200).json({
      message: "Tasks reordered successfully",
      tasks: updatedTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error reordering tasks",
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
};