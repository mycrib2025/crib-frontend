import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CribWorld from "../components/CribWorld";
import api from "../lib/api";

export default function WorldView() {
  const { worldId } = useParams();
  const [world, setWorld] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorld = async () => {
      try {
        const res = await api.get(`/worlds/${worldId}`);
        setWorld(res.data);
      } catch (err) {
        console.error("Failed to load world:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWorld();
  }, [worldId]);

  if (loading) return <div>Loading...</div>;
  if (!world) return <div>World not found</div>;

  return <CribWorld world={world} />;
}
