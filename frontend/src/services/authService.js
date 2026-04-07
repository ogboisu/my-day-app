import api from "./api";

export const signupRequest = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const loginRequest = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const getMeRequest = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
