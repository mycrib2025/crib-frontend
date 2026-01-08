import { MOODS } from "../constants/moods";

export default function MoodFilter({ selectedMood, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-full text-sm ${
          selectedMood === "all"
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
      >
        All
      </button>

      {Object.entries(MOODS).map(([key, mood]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 ${
            selectedMood === key
              ? "bg-black text-white"
              : "bg-gray-100"
          }`}
        >
          <span>{mood.emoji}</span>
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  );
}