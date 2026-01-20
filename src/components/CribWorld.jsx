import "../styles/cribWorld.css";
import PulseLines from "./PulseLines";
import { useMood } from "../context/MoodContext";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function CribWorld({ children, userId }) {
  const { mood } = useMood();
  const [world, setWorld] = useState(null);

  /* -------- LOAD WORLD -------- */
  useEffect(() => {
    if (!userId) return;

    api
      .get(`/worlds/user/${userId}`)
      .then((res) => setWorld(res.data[0]))
      .catch((err) => console.error("WORLD LOAD ERROR", err));
  }, [userId]);

  /* -------- SYNC WORLD -------- */
  const syncWorld = async (data) => {
    if (!world?._id) return;

    try {
      const res = await api.put(`/worlds/${world._id}`, data);
      setWorld(res.data);
    } catch (err) {
      console.error("WORLD SYNC ERROR", err);
    }
  };

  /* -------- MOOD → WORLD -------- */
  useEffect(() => {
    if (!world?._id) return;
    if (world.mood === mood) return;

    syncWorld({ mood });
  }, [mood, world]);

  return (
    <div
      className={`crib-world mood-${mood}`}
      style={{
        "--dream": world?.dreamLevel ?? 50,
        "--fantasy": world?.fantasyLevel ?? 50,
      }}
    >
      {world?.stars && <div className="crib-layer stars" />}
      {world?.clouds && <div className="crib-layer clouds" />}
      {world?.auroras && <div className="crib-layer auroras" />}

      <div className="crib-layer feelings" />
      <div className="crib-layer dreams" />

      <PulseLines />

      <div className="crib-content">{children}</div>
    </div>
  );
}
