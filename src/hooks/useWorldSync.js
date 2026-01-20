import { useState, useEffect } from "react";
import api from "../lib/api";

export default function useWorldSync(userId) {
  const [world, setWorld] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    api
      .get(`/worlds/user/${userId}`)
      .then((res) => {
        setWorld(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("WORLD LOAD ERROR", err);
        setLoading(false);
      });
  }, [userId]);

  const updateWorld = async (updates) => {
    if (!world?._id) return;

    try {
      const res = await api.put(
        `/worlds/${world._id}`,
        updates
      );
      setWorld(res.data);
    } catch (err) {
      console.error("WORLD UPDATE ERROR", err);
    }
  };

  return {
    world,
    updateWorld,
    isOwner: world?.owner === userId,
    loading,
  };
}
