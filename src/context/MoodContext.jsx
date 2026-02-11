import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";

export const MoodContext = createContext(); // ✅ ADD `export`

export function MoodProvider({ children }) {
  const [mood, setMood] = useState("calm");

  useEffect(() => {
    api.get("/mood")
      .then(res => setMood(res.data.mood))
      .catch(() => {});
  }, []);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}
