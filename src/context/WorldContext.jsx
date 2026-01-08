import { createContext, useContext, useState } from "react";
import axios from "axios";

const WorldContext = createContext();

export const WorldProvider = ({ children }) => {
  const [world, setWorld] = useState(null);

  const loadWorld = async (worldId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/worlds/${worldId}`
      );
      setWorld(res.data);
    } catch (err) {
      console.error("WORLD LOAD ERROR", err);
    }
  };

  return (
    <WorldContext.Provider value={{ world, loadWorld }}>
      {children}
    </WorldContext.Provider>
  );
};

export const useWorld = () => useContext(WorldContext);