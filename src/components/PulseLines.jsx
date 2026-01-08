import { useEffect, useState } from "react";
import { useMood } from "../context/MoodContext";

export default function PulseLines() {
  const { mood } = useMood();
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const lines = 9;
  const center = Math.floor(lines / 2);

  return (
    <div
      className="pulse-container"
      style={{
        "--mx": `${pos.x}%`,
        "--my": `${pos.y}%`,
      }}
    >
      {Array.from({ length: lines }).map((_, i) => {
        const distance = Math.abs(i - center);
        const bend = distance * 8; // curve intensity

        return (
          <span
            key={i}
            className={`pulse-line pulse-${mood}`}
            style={{
              animationDelay: `${i * 0.12}s`,
              transform: `translateY(${bend}px)`,
            }}
          />
        );
      })}
    </div>
  );
}