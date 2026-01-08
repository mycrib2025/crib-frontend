export default function AvatarFallback({ name, size = 48 }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold select-none"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}
