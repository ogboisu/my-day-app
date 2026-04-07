const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.patch("/reorder", protect, reorderTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
