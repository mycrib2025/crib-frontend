import Avatar from "./Avatar";

export default function AvatarGroup({ users = [], max = 5 }) {
  const displayUsers = users.slice(0, max);
  const extra = users.length - max;

  return (
    <div className="flex">
      {displayUsers.map((user, index) => (
        <div
          key={user.id || index}
          className={`-mr-3 border-2 border-white rounded-full`}
        >
          <Avatar
            src={user.src}
            name={user.name}
            size={40}
            status={user.status}
          />
        </div>
      ))}

      {extra > 0 && (
        <div className="-mr-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold border-2 border-white">
            +{extra}
          </div>
        </div>
      )}
    </div>
  );
}
