const API_URL = "http://localhost:5000/api/users";

import axios from "axios";

export const getFollowers = (username) =>
  axios.get(`/api/users/${username}/followers`);

export const getFollowing = (username) =>
  axios.get(`/api/users/${username}/following`);

export async function followUser(targetId, userId) {
  const res = await fetch(`${API_URL}/follow/${targetId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
}

export async function unfollowUser(targetId, userId) {
  const res = await fetch(`${API_URL}/unfollow/${targetId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
}

export async function addFriend(targetId, userId) {
  const res = await fetch(`${API_URL}/add-friend/${targetId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
}

export async function removeFriend(targetId, userId) {
  const res = await fetch(`${API_URL}/remove-friend/${targetId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
}

export async function getUserSocial(userId) {
  const res = await fetch(`${API_URL}/${userId}/social`);
  return res.json();
}
