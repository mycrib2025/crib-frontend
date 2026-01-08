export default function WorldSettings({ world, updateWorld }) {
  if (!world) return null;

  return (
    <div className="world-settings">
      <h3>World Settings</h3>

      <label>
        ⭐ Stars
        <input
          type="checkbox"
          checked={world.stars}
          onChange={e => updateWorld({ stars: e.target.checked })}
        />
      </label>

      <label>
        ☁️ Clouds
        <input
          type="checkbox"
          checked={world.clouds}
          onChange={e => updateWorld({ clouds: e.target.checked })}
        />
      </label>

      <label>
        🌌 Auroras
        <input
          type="checkbox"
          checked={world.auroras}
          onChange={e => updateWorld({ auroras: e.target.checked })}
        />
      </label>

      <label>
        🌙 Dream Level
        <input
          type="range"
          min="0"
          max="100"
          value={world.dreamLevel}
          onChange={e =>
            updateWorld({ dreamLevel: Number(e.target.value) })
          }
        />
      </label>

      <label>
        🦄 Fantasy Level
        <input
          type="range"
          min="0"
          max="100"
          value={world.fantasyLevel}
          onChange={e =>
            updateWorld({ fantasyLevel: Number(e.target.value) })
          }
        />
      </label>
    </div>
  );
}
