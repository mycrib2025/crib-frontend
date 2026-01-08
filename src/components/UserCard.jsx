export default function UserCard({
  user,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary
}) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.username}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {secondaryLabel && (
          <button
            onClick={onSecondary}
            className="px-3 py-1 text-sm border rounded"
          >
            {secondaryLabel}
          </button>
        )}

        <button
          onClick={onAction}
          className="px-3 py-1 text-sm bg-black text-white rounded"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}