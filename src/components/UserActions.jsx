import React from "react";
import {
  followUser,
  unfollowUser,
  addFriend,
  removeFriend,
} from "../api/userApi";

export default function UserActions({ currentUserId, targetUserId, isPrivate }) {
  const handleFollow = async () => {
    await followUser(targetUserId);
    alert(isPrivate ? "Follow request sent" : "Followed");
  };

  return (
    <div className="flex gap-2">
      <button
      onClick={handleFollow}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {isPrivate ? "Request to Follow" : "Follow"}
      </button>

      <button
        onClick={() => followUser(targetUserId, currentUserId)}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Follow
      </button>

      <button
        onClick={() => unfollowUser(targetUserId, currentUserId)}
        className="px-3 py-1 bg-gray-500 text-white rounded"
      >
        Unfollow
      </button>

      <button
        onClick={() => addFriend(targetUserId, currentUserId)}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        Add Friend
      </button>

      <button
        onClick={() => removeFriend(targetUserId, currentUserId)}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Remove Friend
      </button>
    </div>
  );
}