import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get("/api/users/me");
      setIsPrivate(res.data.isPrivate);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    await axios.put("/api/users/me", { isPrivate });
    alert("Profile updated");
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      {/* PRIVATE PROFILE TOGGLE */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
        <span>Private Profile</span>
      </label>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
}