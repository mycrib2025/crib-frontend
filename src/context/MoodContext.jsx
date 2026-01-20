import { createContext, useContext, useState } from "react";
import axios from "axios";
import api from "../lib/api";

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [mood, setMood] = useState("default");

  const changeMood = async (newMood) => {
    console.log("Mood changed to:", newMood);
    setMood(newMood);

    // Optional backend save (can fail safely)
    try {
      await api.post("/moods", {
  mood,
});
    } catch (error) {
      console.warn("MOOD SAVE FAILED (safe to ignore for now)");
    }
  };

  return (
    <MoodContext.Provider value={{ mood, changeMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => useContext(MoodContext);