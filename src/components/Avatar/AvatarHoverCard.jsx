import { useState } from "react";
import Avatar from "./Avatar";

export default function AvatarHoverCard({
  src,
  name,
  status,
  bio = "No bio provided.",
  size = 48,
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Avatar src={src} name={name} status={status} size={size} />

      {hover && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-56 p-3 bg-white shadow-xl rounded-xl border">
          <div className="flex items-center gap-3">
            <Avatar src={src} name={name} size={40} showStatus={false} />
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-xs text-gray-500 capitalize">{status}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2">{bio}</p>
        </div>
      )}
    </div>
  );
}
