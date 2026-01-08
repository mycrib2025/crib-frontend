const BASE = "http://localhost:5000/api";

async function api(path, { method = "GET", body, headers } = {}) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}

export const Posts = {
  list: () => api("/posts"),
  create: (payload) => api("/posts", { method: "POST", body: payload }),
  like: (postId, userId) => api(`/posts/${postId}/like`, { method: "POST", body: { userId } }),
  comment: (postId, userId, text) => api(`/posts/${postId}/comment`, { method: "POST", body: { userId, text } }),
};

export const Users = {
  getProfile: (userId) => api(`/profile/${userId}`),
  updateProfile: (userId, payload) => api(`/profile/${userId}`, { method: "PUT", body: payload }),
  list: () => api("/users"),
};

export const Dream = {
  get: (userId) => api(`/dream-profile/${userId}`),
  create: (data) => api("/dream-profile/create", { method: "POST", body: data }),
  update: (userId, data) => api(`/dream-profile/update/${userId}`, { method: "PUT", body: data }),
  // Uploads require multipart/form-data — handled separately from this helper
};

export const Follow = {
  follow: (userIdToFollow, followerId) => api(`/follow/${userIdToFollow}/follow`, { method: "POST", body: { followerId } }),
  unfollow: (userIdToUnfollow, followerId) => api(`/follow/${userIdToUnfollow}/unfollow`, { method: "POST", body: { followerId } }),
  followers: (userId) => api(`/follow/${userId}/followers`),
  following: (userId) => api(`/follow/${userId}/following`),
  suggestions: (userId) => api(`/follow/${userId}/suggestions`),
};

export const Notifications = {
  list: (userId) => api(`/notifications/${userId}`), // optional; implement if you have notifications route
};

export async function fetchDreamProfile(userId) {
  const res = await fetch(`${API_BASE}/dream-profile/${userId}`);
  return res.json();
}

export async function updateDreamProfile(userId, data) {
  const res = await fetch(`${API_BASE}/dream-profile/upload/${userId}`, {
    method: "PUT",
    body: data, // should be FormData if uploading files
  });
  return res.json();
}

export async function createDreamProfile(data) {
  const res = await fetch(`${API_BASE}/dream-profile/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
