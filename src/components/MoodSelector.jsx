import { useMood } from "../context/MoodContext";

export default function MoodSelector() {
  const { mood, changeMood } = useMood();

  return (
    <div className="mood-selector">
      <select
        value={mood}
        onChange={(e) => changeMood(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="dreamy">Dreamy</option>
        <option value="fantasy">Fantasy</option>
      </select>
    </div>
  );
}