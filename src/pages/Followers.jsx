import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFollowers } from "../api/userApi";

export default function Followers() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getFollowers(username)
      .then(res => setFollowers(res.data))
      .catch(err => setError(err.response?.data?.message));
  }, [username]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Followers</h2>

      {followers.length === 0 && <p>No followers yet</p>}

      {followers.map(user => (
        <div
          key={user._id}
          className="flex items-center gap-3 p-2 border-b"
        >
          <img
            src={user.avatar || "/avatar.png"}
            className="w-10 h-10 rounded-full"
          />
          <span>{user.username}</span>
        </div>
      ))}
    </div>
  );
}