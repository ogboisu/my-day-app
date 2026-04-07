import api from "./api";

export const getTasksRequest = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTaskRequest = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const updateTaskRequest = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTaskRequest = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const reorderTasksRequest = async (tasks) => {
  const response = await api.patch("/tasks/reorder", { tasks });
  return response.data;
};
