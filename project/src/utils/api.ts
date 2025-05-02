import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:8000/", // Replace with your actual API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}").token
      : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear local storage and redirect to login
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;