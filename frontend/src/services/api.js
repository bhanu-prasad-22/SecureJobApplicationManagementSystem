//It sits between your React components and your Spring Boot server.

//The Interceptor: This is like a "Security Guard" that automatically grabs your JWT from localStorage and attaches it to the header of every request: Authorization: Bearer <token>.

// Why it matters: Without this, your Spring Boot SecurityConfig would reject every request with a 403 Forbidden.
//next is "Bouncer" ProtectedRoute.jsx
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api",
});

// Attach JWT token automatically
API.interceptors.request.use((config) => { // Use 'config' consistently
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // This is crucial
}, (error) => {
  return Promise.reject(error);
});

export default API;
