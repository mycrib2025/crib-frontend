import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import WorldChat from "../components/WorldChat";

import PulseLines from "../components/PulseLines";

export default function World() {
  const { worldId } = useParams();
  const [world, setWorld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("loading");

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchWorld = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/worlds/${worldId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setWorld(res.data);
        resolveAccessState(res.data);
      } catch (err) {
        console.error("WORLD LOAD ERROR", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorld();
  }, [worldId]);

  const resolveAccessState = (world) => {
    if (!world.isPrivate) return setStatus("approved");
    if (world.owner === currentUserId) return setStatus("owner");
    if (world.allowedViewers?.includes(currentUserId)) return setStatus("approved");
    if (world.accessRequests?.includes(currentUserId)) return setStatus("pending");

    setStatus("locked");
  };

  const requestAccess = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/worlds/${world._id}/request-access`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus("pending");
    } catch (err) {
      console.error("REQUEST ACCESS ERROR", err);
    }
  };

  // ⏳ LOADING
  if (loading) {
    return <div className="p-10">🌌 Loading world...</div>;
  }

  if (!world) {
    return <div className="p-10">World not found</div>;
  }

  // 🔒 LOCKED
  if (status === "locked") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <button
          onClick={requestAccess}
          className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700"
        >
          🔐 Request Access
        </button>
      </div>
    );
  }

  // ⏳ PENDING
  if (status === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        ⏳ Access request pending approval
      </div>
    );
  }

// 🌍 APPROVED / OWNER VIEW
return (
  <div className={`min-h-screen relative mood-${world.mood}`}>
    <PulseLines />

    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {world.stars && <div className="absolute inset-0 opacity-40">✨✨✨</div>}
      {world.clouds && <div className="absolute inset-0 opacity-30">☁️☁️</div>}
      {world.aurora && <div className="absolute inset-0 opacity-30">🌈</div>}
    </div>

    <div className="relative z-10 p-10 text-white">
      <h1 className="text-4xl font-bold mb-2">{world.name}</h1>

      <p className="opacity-80 mb-6">
        Mood: <span className="capitalize">{world.mood}</span>
      </p>

      <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 max-w-xl mb-6">
        <p>
          Welcome inside this world 🌌  
          You are approved to view this space.
        </p>
      </div>

      {/* 💬 WORLD CHAT */}
      <WorldChat worldId={world._id} />
    </div>
  </div>
);
}