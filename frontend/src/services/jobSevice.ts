import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getJobs = async () => {
  try {
    const response = await api.get("/jobs");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to fetch jobs";
  }
};
