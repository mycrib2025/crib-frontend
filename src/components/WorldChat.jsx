import { useEffect, useRef, useState } from "react";
import api from "../lib/api";
import { io } from "socket.io-client";
import { useMood } from "../context/MoodContext";

const SOCKET_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  window.location.origin;

export default function WorldChat({ worldId }) {
  const { mood } = useMood();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef(null);

  /* 📥 LOAD CHAT HISTORY */
  useEffect(() => {
    if (!worldId) return;

    api
      .get(`/world-chat/${worldId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("CHAT LOAD ERROR", err));
  }, [worldId]);

  /* 🔌 SOCKET CONNECT */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !worldId) return;

    socketRef.current = io(SOCKET_URL, {
      auth: { token },
    });

    socketRef.current.emit("join-world", { worldId });

    socketRef.current.on("worldMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current?.disconnect();
  }, [worldId]);

  /* 📤 SEND MESSAGE */
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const res = await api.post(`/world-chat/${worldId}`, {
        message: text,
      });

      // optimistic update handled by socket broadcast
      setText("");
    } catch (err) {
      console.error("SEND MESSAGE ERROR", err);
    }
  };

  return (
    <div className={`world-chat mood-${mood}`}>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className="message">
            <strong>{msg.sender?.username || "User"}:</strong>{" "}
            {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say something..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
