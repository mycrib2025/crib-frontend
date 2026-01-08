import "../styles/cribWorld.css";
import PulseLines from "./PulseLines";
import { useMood } from "../context/MoodContext";
import { useEffect, useState } from "react";
import axios from "axios";
import useWorldSync from "../hooks/useWorldSync";

export default function CribWorld({ children, userId }) {
  const { mood } = useMood();
  const [world, setWorld] = useState(null);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/worlds/user/${userId}`)
      .then(res => setWorld(res.data[0]))
      .catch(err => console.error("WORLD LOAD ERROR", err));
  }, [userId]);

  const syncWorld = async (data) => {
    if (!world?._id) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/worlds/${world._id}`,
        data
      );
      setWorld(res.data);
    } catch (err) {
      console.error("WORLD SYNC ERROR", err);
    }
  };

  useEffect(() => {
    if (!world?._id) return;
    if (world.mood === mood) return;

    useEffect(() => {
    if (!world?._id) return;
    if (world.mood === mood) return;

    updateWorld({ mood });
  }, [mood, world]);
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
