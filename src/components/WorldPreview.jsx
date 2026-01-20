import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/worldPreview.css";

export default function WorldPreview({ userId }) {
  const [world, setWorld] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    api
      .get(`/worlds/user/${userId}`)
      .then((res) => {
        // user may have multiple worlds later
        setWorld(res.data[0]);
      })
      .catch((err) => {
        console.error("WORLD PREVIEW ERROR", err);
      });
  }, [userId]);

  if (!world) {
    return (
      <div className="world-preview empty">
        🌌 This user hasn’t created a world yet
      </div>
    );
  }

  return (
  <div
    onClick={() => navigate(`/world/${world._id}`)}
    className={`cursor-pointer rounded-2xl p-4 text-white
      bg-black/40 backdrop-blur-md hover:scale-105 transition
      mood-${world.mood}`}
  >
    {/* VISUAL PREVIEW */}
    <div className="relative h-24 overflow-hidden rounded-lg mb-3">
      {world.stars && <div className="absolute inset-0 opacity-30">✨✨✨</div>}
      {world.clouds && <div className="absolute inset-0 opacity-30">☁️☁️</div>}
      {world.auroras && <div className="absolute inset-0 opacity-30">🌈</div>}
    </div>

    {/* INFO */}
    <h3 className="font-semibold">{world.name || "Untitled World"}</h3>
    <p className="text-sm opacity-70">Mood: {world.mood}</p>
    <span className="text-xs opacity-80">Enter World →</span>
  </div>
);
}
