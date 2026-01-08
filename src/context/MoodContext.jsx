import { createContext, useContext, useState } from "react";
import axios from "axios";

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [mood, setMood] = useState("default");

  const changeMood = async (newMood) => {
    console.log("Mood changed to:", newMood);
    setMood(newMood);

    // Optional backend save (can fail safely)
    try {
      await axios.post("http://localhost:5000/api/moods", {
        mood: newMood,
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