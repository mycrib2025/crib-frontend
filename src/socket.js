import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const SOCKET_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  window.location.origin;

export const socket = io(SOCKET_URL, {
  auth: { token },
});
