import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  getTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  reorderTasksRequest,
} from "../services/taskService";

import {
  requestNotificationPermission,
  startReminderChecker,
} from "../utils/reminderUtils";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");
      const data = await getTasksRequest();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let stopChecker;

    const initReminders = async () => {
      const permission = await requestNotificationPermission();

      if (permission === "granted" && tasks.length > 0) {
        stopChecker = startReminderChecker(tasks);
      }
    };

    initReminders();

    return () => {
      if (stopChecker) stopChecker();
    };
  }, [tasks]);

  const handleAddTask = async (taskData) => {
    try {
      setTaskLoading(true);
      setError("");

      const response = await createTaskRequest(taskData);

      setTasks((prev) =>
        [...prev, response.task].sort((a, b) => a.order - b.order)
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setTaskLoading(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      setError("");

      const response = await updateTaskRequest(task._id, {
        completed: !task.completed,
      });

      setTasks((prev) =>
        prev.map((item) => (item._id === task._id ? response.task : item))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setError("");
      await deleteTaskRequest(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    // If dropped outside the list, do nothing
    if (!destination) return;

    // If position did not change, do nothing
    if (destination.index === source.index) return;

    // Create a copy of the current tasks
    const reorderedTasks = [...tasks];

    // Remove the dragged item from its original position
    const [movedTask] = reorderedTasks.splice(source.index, 1);

    // Insert it into the new position
    reorderedTasks.splice(destination.index, 0, movedTask);

    // Recalculate the order field for every task
    const updatedTasks = reorderedTasks.map((task, index) => ({
      ...task,
      order: index,
    }));

    // Optimistically update UI immediately
    setTasks(updatedTasks);

    try {
      const payload = updatedTasks.map((task) => ({
        id: task._id,
        order: task.order,
      }));

      await reorderTasksRequest(payload);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reorder tasks");

      // If backend update fails, reload from server to restore correct state
      fetchTasks();
    }
  };

  if (pageLoading) {
    return <div className="page-center">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard container">
        {error && <div className="alert alert--error">{error}</div>}

        <section className="dashboard__grid">
          <TaskForm onAddTask={handleAddTask} loading={taskLoading} />

          <div className="dashboard__tasks">
            <div className="section-heading">
              <h2>Your Tasks</h2>
              <p>Organize your day and stay on track.</p>
            </div>

            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onDragEnd={handleDragEnd}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
