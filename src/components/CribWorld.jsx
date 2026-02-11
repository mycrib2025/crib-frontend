import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import useWorldSync from "../hooks/useWorldSync";
import { useMood } from "../context/MoodContext";

export default function CribWorld({ worldId, userId, children }) {
  const { mood, setMood } = useMood();
  const { world, updateWorld, isOwner } = useWorldSync(userId);

  const socketRef = useRef(null);
  const lastMoodRef = useRef(null);

  /* 🔌 SOCKET CONNECT */
  useEffect(() => {
    if (!worldId) return;

    const token = localStorage.getItem("token");

    socketRef.current = io(
      import.meta.env.VITE_API_URL?.replace("/api", "") ||
        window.location.origin,
      { auth: { token } }
    );

    socketRef.current.emit("join-world", { worldId });

    // ✅ backend sends just `mood`, not `{ mood }`
    socketRef.current.on("world-mood-update", (incomingMood) => {
      if (incomingMood === mood) return;

      lastMoodRef.current = incomingMood;
      setMood(incomingMood);
    });

    return () => {
      socketRef.current?.off("world-mood-update");
      socketRef.current?.disconnect();
    };
  }, [worldId, mood, setMood]);

  /* 🎭 OWNER → SYNC MOOD */
  useEffect(() => {
    if (!world || !isOwner) return;
    if (mood === lastMoodRef.current) return;

    lastMoodRef.current = mood;

    updateWorld({ mood });

    socketRef.current?.emit("world-mood-update", {
      worldId,
      mood,
    });
  }, [mood, world, isOwner, worldId, updateWorld]);

  const activeMood = isOwner ? mood : world?.mood || mood || "calm";

  return (
    <div className={`min-h-screen crib-world mood-${activeMood}`}>
      {children}
    </div>
  );
}
