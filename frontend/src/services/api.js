import axios from "axios";

// Create a reusable Axios instance for all API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const storedAuth = localStorage.getItem("mydayAuth");

  if (storedAuth) {
    const { token } = JSON.parse(storedAuth);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
