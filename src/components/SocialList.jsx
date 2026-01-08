import React, { useEffect, useState } from "react";
import { getUserSocial } from "../api/userApi";

export default function SocialList({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getUserSocial(userId).then(setData);
  }, [userId]);

  if (!data) return <p>Loading social data...</p>;

  return (
    <div className="space-y-6">
      {/* Followers */}
      <div>
        <h3 className="font-bold text-lg">
          Followers ({data.followers.length})
        </h3>
        {data.followers.map((u) => (
          <UserRow key={u._id} user={u} />
        ))}
      </div>

      {/* Following */}
      <div>
        <h3 className="font-bold text-lg">
          Following ({data.following.length})
        </h3>
        {data.following.map((u) => (
          <UserRow key={u._id} user={u} />
        ))}
      </div>

      {/* Friends */}
      <div>
        <h3 className="font-bold text-lg">
          Friends ({data.friends.length})
        </h3>
        {data.friends.map((u) => (
          <UserRow key={u._id} user={u} />
        ))}
      </div>
    </div>
  );
}

function UserRow({ user }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <img
        src={user.avatar || "/avatar.png"}
        className="w-8 h-8 rounded-full"
        alt=""
      />
      <span>@{user.username}</span>
    </div>
  );
}