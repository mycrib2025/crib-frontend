import UserCard from "./UserCard";

export default function FriendsList({ friends, onRemove }) {
  return (
    <div className="space-y-3">
      {friends.length === 0 && (
        <p className="text-gray-500 text-sm">No friends yet.</p>
      )}

      {friends.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          actionLabel="Remove"
          onAction={() => onRemove(user)}
        />
      ))}
    </div>
  );
}