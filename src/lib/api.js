import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ===== API GROUPS =====

export const Posts = {
  list: () => api.get("/posts"),
  create: (payload) => api.post("/posts", payload),
  like: (postId, userId) =>
    api.post(`/posts/${postId}/like`, { userId }),
  comment: (postId, userId, text) =>
    api.post(`/posts/${postId}/comment`, { userId, text }),
};

export const Users = {
  getProfile: (userId) => api.get(`/profile/${userId}`),
  updateProfile: (userId, payload) =>
    api.put(`/profile/${userId}`, payload),
  list: () => api.get("/users"),
};

export const Dream = {
  get: (userId) => api.get(`/dream-profile/${userId}`),
  create: (data) => api.post("/dream-profile/create", data),
  update: (userId, data) =>
    api.put(`/dream-profile/update/${userId}`, data),
};

export const Follow = {
  follow: (userIdToFollow, followerId) =>
    api.post(`/follow/${userIdToFollow}/follow`, { followerId }),
  unfollow: (userIdToUnfollow, followerId) =>
    api.post(`/follow/${userIdToUnfollow}/unfollow`, { followerId }),
  followers: (userId) =>
    api.get(`/follow/${userId}/followers`),
  following: (userId) =>
    api.get(`/follow/${userId}/following`),
  suggestions: (userId) =>
    api.get(`/follow/${userId}/suggestions`),
};

export const Notifications = {
  list: (userId) => api.get(`/notifications/${userId}`),
};

export default api;
