import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ProfileHeader from "../components/ProfileHeader";
import "../styles/profile.css";

export default function Profile() {
  const { id } = useParams(); // profile user ID from URL

  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ⚠️ TEMP USER ID (this is YOU)
  // Replace later when auth is ready
  const currentUserId = "692fa2fc8b37c6fcfe686ee8";

  const rejectRequest = async (requesterId) => {
  try {
    await axios.post(
      `http://localhost:5000/api/users/${currentUserId}/reject-follow`,
      { requesterId }
    );

    alert("Follow request rejected");
  } catch (err) {
    console.error("Reject error:", err);
  }
};

  const acceptRequest = async (requesterId) => {
  await axios.post(
    `http://localhost:5000/api/users/${currentUserId}/accept-follow`,
    { requesterId }
  );

  alert("Follow request accepted");
};

  // ==========================
  // 1️⃣ FETCH PROFILE USER
  // ==========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/profile/${id}`
        );

        setProfileUser(res.data);

        // check if already following
        setIsFollowing(res.data.followers.includes(currentUserId));
      } catch (err) {
        setError("Profile not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, currentUserId]);

  // ==========================
  // 2️⃣ FOLLOW / UNFOLLOW
  // ==========================
  const handleFollow = async () => {
  try {
    await axios.post(
      `http://localhost:5000/api/users/${profileUser._id}/follow`,
      {
        currentUserId: "692fa2fc8b37c6fcfe686ee8" // TEMP
      }
    );

      const following = res.data.following;

      setIsFollowing(following);

      setProfileUser(prev => ({
        ...prev,
        followers: following
          ? [...prev.followers, currentUserId]
          : prev.followers.filter(uid => uid !== currentUserId),
      }));
    } catch (err) {
      alert("Followed!");
      console.error(err);
    alert(err.response?.data?.message || "Follow failed");
    }
  };

  // ==========================
  // 3️⃣ STATES
  // ==========================
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!profileUser) return <div>Profile not found</div>;

  const isOwner = profileUser._id === currentUserId;
  const isPrivate = profileUser.isPrivate;

  // ==========================
  // 4️⃣ PRIVATE PROFILE BLOCK
  // ==========================
  if (isPrivate && !isOwner && !isFollowing) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold">🔒 Private Account</h2>
        <p>Follow this user to see their profile.</p>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleFollow}
        >
          Follow
        </button>
      </div>
    );
  }

  // ==========================
  // 5️⃣ PROFILE VIEW
  // ==========================
  return (
    <div>
      <h1 className="text-2xl font-bold">{profileUser.username}</h1>
      <p>{profileUser.bio}</p>

      <div className="mt-4 flex gap-4">
        <span>Followers: {profileUser.followers.length}</span>
        <span>Following: {profileUser.following.length}</span>
      </div>

      {!isOwner && (
        <button
          onClick={handleFollow}
          className={`mt-4 px-4 py-2 rounded text-white ${
            isFollowing ? "bg-gray-500" : "bg-blue-600"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
}