import { useEffect, useState } from "react";
import axios from "axios";

export default function FollowRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          api.get("/users/...")
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to load follow requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  const accept = async (requesterId) => {
    await axios.post(
      api.post("/users/..."),
      { requesterId }
    );
    setRequests(prev => prev.filter(u => u._id !== requesterId));
  };

  const reject = async (requesterId) => {
    await axios.post(
      api.post("/users/..."),
      { requesterId }
    );
    setRequests(prev => prev.filter(u => u._id !== requesterId));
  };

  if (loading) {
    return <p className="text-center mt-20">Loading follow requests...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Follow Requests</h1>

      {requests.length === 0 && (
        <p className="text-gray-400">No pending follow requests</p>
      )}

      <div className="space-y-3">
        {requests.map(user => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || "/avatar.png"}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">{user.username}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => accept(user._id)}
                className="px-4 py-1 rounded-full bg-green-600 hover:bg-green-700 text-white"
              >
                Accept
              </button>

              <button
                onClick={() => reject(user._id)}
                className="px-4 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}