import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true, // ✅ correct place
  headers: {
    "Content-Type": "application/json",
  },
});

/* ✅ Attach token to every request */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ✅ Catch expired / invalid token */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 🔁 Force redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
