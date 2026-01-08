export default function AvatarStatus({ status, size }) {
  const statusColor = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-400",
  }[status] || "bg-gray-400";

  const dotSize = size * 0.25; // 25% of avatar

  return (
    <span
      className={`${statusColor} absolute rounded-full border-2 border-white`}
      style={{
        width: dotSize,
        height: dotSize,
        bottom: 0,
        right: 0,
      }}
    ></span>
  );
}
