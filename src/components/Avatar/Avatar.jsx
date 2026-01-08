import AvatarFallback from "./AvatarFallback";
import AvatarStatus from "./AvatarStatus";

export default function Avatar({
  src,
  name = "User",
  size = 48,
  status = "offline",
  showStatus = true,
  className = ""
}) {
  const avatarSize = {
    width: size,
    height: size,
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`rounded-full object-cover ${className}`}
          style={avatarSize}
        />
      ) : (
        <AvatarFallback name={name} size={size} />
      )}

      {showStatus && (
        <AvatarStatus status={status} size={size} />
      )}
    </div>
  );
}
