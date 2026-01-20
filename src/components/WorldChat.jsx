import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import api from "../api/api";

export default function WorldChat({ worldId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef(null);

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!worldId || !token) return;

    // CONNECT SOCKET
    socketRef.current = io(
      import.meta.env.VITE_API_URL.replace("/api", ""),
      { auth: { token } }
    );

    socketRef.current.emit("join-world", { worldId });

    socketRef.current.on("world-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // LOAD CHAT HISTORY
    api
      .get(`/world-chat/${worldId}`)
      .then((res) => setMessages(res.data))
      .catch(console.error);

    return () => socketRef.current.disconnect();
  }, [worldId, token]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await api.post(`/world-chat/${worldId}`, {
        message: text,
      });

      setText("");
    } catch (err) {
      console.error("SEND MESSAGE ERROR", err);
    }
  };

  return (
    <div className="mt-6 bg-black/40 rounded-2xl p-4 max-w-xl">
      <h3 className="font-bold mb-3 text-white">💬 World Chat</h3>

      {/* MESSAGES */}
      <div className="h-64 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => {
          const isMe = msg.sender?._id === currentUserId;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={msg.sender?.avatar || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}

              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                  isMe
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-gray-800 text-white rounded-bl-none"
                }`}
              >
                {!isMe && (
                  <div className="text-xs opacity-70 mb-1">
                    {msg.sender?.username || "User"}
                  </div>
                )}
                {msg.message}
              </div>

              {isMe && (
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  alt="me"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full bg-black/60 text-white outline-none"
          placeholder="Say something..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-5 bg-purple-600 rounded-full hover:bg-purple-700 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
