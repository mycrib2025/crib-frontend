import { useEffect, useState } from "react";
import axios from "axios";

export default function WorldControls({ world, isOwner, onUpdate }) {
  const [localWorld, setLocalWorld] = useState(world);

  useEffect(() => {
    setLocalWorld(world);
  }, [world]);

  if (!isOwner || !localWorld) return null;

  const update = (changes) => {
    const updated = { ...localWorld, ...changes };
    setLocalWorld(updated);
    onUpdate(updated); // update parent immediately
  };

  return (
    <div className="world-controls">
      <h3>🌍 World Settings</h3>

      {/* MOOD */}
      <label>
        Mood
        <select
          value={localWorld.mood}
          onChange={(e) => update({ mood: e.target.value })}
        >
          <option value="dreamy">Dreamy</option>
          <option value="calm">Calm</option>
          <option value="dark">Dark</option>
          <option value="neon">Neon</option>
        </select>
      </label>

      {/* TOGGLES */}
      <label>
        <input
          type="checkbox"
          checked={localWorld.stars}
          onChange={(e) => update({ stars: e.target.checked })}
        />
        Stars
      </label>

      <label>
        <input
          type="checkbox"
          checked={localWorld.clouds}
          onChange={(e) => update({ clouds: e.target.checked })}
        />
        Clouds
      </label>

      <label>
        <input
          type="checkbox"
          checked={localWorld.aurora}
          onChange={(e) => update({ aurora: e.target.checked })}
        />
        Aurora
      </label>

      {/* SLIDERS */}
      <label>
        Fantasy Level
        <input
          type="range"
          min="0"
          max="100"
          value={localWorld.fantasyLevel}
          onChange={(e) =>
            update({ fantasyLevel: Number(e.target.value) })
          }
        />
      </label>

      <label>
        Dream Intensity
        <input
          type="range"
          min="0"
          max="100"
          value={localWorld.dreamIntensity}
          onChange={(e) =>
            update({ dreamIntensity: Number(e.target.value) })
          }
        />
      </label>
    </div>
  );
}
