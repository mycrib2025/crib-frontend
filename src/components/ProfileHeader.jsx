export default function ProfileHeader({ user }) {
  if (!user) return null;

  return (
    <div className="profile-header">
      <img
        className="profile-avatar"
        src={user.avatar || "/avatar-placeholder.png"}
        alt="avatar"
      />

      <div className="profile-info">
        <h1 className="profile-name">{user.username}</h1>
        <p className="profile-bio">
          {user.bio || "Living inside my CRIB world 🌌"}
        </p>

        <div className="profile-stats">
          <span>{user.followers?.length || 0} Followers</span>
          <span>{user.following?.length || 0} Following</span>
        </div>
      </div>
    </div>
  );
}
