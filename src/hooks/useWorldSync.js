import { useEffect, useState, useCallback } from "react";
import api from "../api/api";

/**
 * World authority hook
 */
export default function useWorldSync(userId) {
  const [world, setWorld] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH WORLD ---------- */
  useEffect(() => {
    let mounted = true;

    const fetchWorld = async () => {
      try {
        const { data } = await api.get("/worlds/me");
        if (mounted) setWorld(data);
      } catch (err) {
        console.error("❌ Failed to fetch world", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchWorld();

    return () => {
      mounted = false;
    };
  }, []); // 🚨 NO world dependency

  /* ---------- UPDATE WORLD ---------- */
  const updateWorld = useCallback(
    async (updates) => {
      if (!world?._id) return;

      try {
        const { data } = await api.put(
          `/worlds/${world._id}`,
          updates
        );

        // ✅ replace state (never mutate)
        setWorld(data);
      } catch (err) {
        console.error("❌ World update failed", err);
      }
    },
    [world?._id]
  );

  /* ---------- OWNERSHIP ---------- */
  const isOwner =
    !!world &&
    (world.owner === userId ||
      world.owner?._id === userId);

  return {
    world,
    loading,
    updateWorld,
    isOwner,
  };
}
