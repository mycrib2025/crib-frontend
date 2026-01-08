import { MOODS } from "../lib/moods";

export default function MoodBackground({ mood }) {
  const activeMood =
    MOODS.find((m) => m.id === mood) || MOODS[0];

  return (
    <div
      className={`
        fixed inset-0 -z-10
        bg-gradient-to-br ${activeMood.bg}
        transition-all duration-700 ease-in-out
        animate-gradient
      `}
    />
  );
}