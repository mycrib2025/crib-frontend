import "./WorldSelector.css";

export default function WorldSelector({
  worlds = [],
  activeWorldId,
  onSelect,
  onCreate
}) {
  return (
    <div className="world-selector">
      <h3>Your Worlds</h3>

      <div className="world-list">
        {worlds.map(world => (
          <button
            key={world.id}
            className={`world-card ${
              world.id === activeWorldId ? "active" : ""
            }`}
            onClick={() => onSelect(world)}
          >
            <div className={`world-preview mood-${world.mood}`}>
              {world.layers?.stars && <span className="mini stars" />}
              {world.layers?.clouds && <span className="mini clouds" />}
              {world.layers?.auroras && <span className="mini auroras" />}
            </div>

            <span className="world-name">{world.name}</span>
          </button>
        ))}

        <button className="world-card create" onClick={onCreate}>
          <div className="world-preview create-preview">+</div>
          <span>Create World</span>
        </button>
      </div>
    </div>
  );
}