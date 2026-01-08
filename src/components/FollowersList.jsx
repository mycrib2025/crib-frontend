import UserCard from "./UserCard";

export default function FollowersList({ followers, onFollowBack }) {
  return (
    <div className="space-y-3">
      {followers.length === 0 && (
        <p className="text-gray-500 text-sm">No followers yet.</p>
      )}

      {followers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          actionLabel="Follow Back"
          onAction={() => onFollowBack(user)}
        />
      ))}
    </div>
  );
}