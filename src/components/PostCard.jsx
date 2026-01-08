import React from "react";

export default function PostCard({ post }) {
  // 🛡️ Safety guard: if post itself is missing
  if (!post) return null;

  // ✅ Normalize user data (works with populated OR flat data)
  const user = post.user || {};

  const avatar =
    user.avatar ||
    post.avatar ||
    "/assets/default-avatar.png";

  const username =
    user.username ||
    post.username ||
    "Unknown User";

  const timestamp =
    post.createdAt ||
    post.timestamp ||
    "";

  const likes = post.likes ?? 0;

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-gray-800">
            {username}
          </h3>

          {timestamp && (
            <p className="text-xs text-gray-500">
              {new Date(timestamp).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Post Text */}
      {post.content && (
        <p className="text-gray-800 mb-3 whitespace-pre-line">
          {post.content}
        </p>
      )}

      {/* Images */}
      {Array.isArray(post.images) && post.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          {post.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="post"
              className="w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      {/* Videos */}
      {Array.isArray(post.videos) && post.videos.length > 0 && (
        <div className="space-y-2 mt-3">
          {post.videos.map((vid, idx) => (
            <video
              key={idx}
              src={vid}
              controls
              className="w-full rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <button className="text-gray-600 hover:text-blue-600 transition">
          👍 Like ({likes})
        </button>

        <button className="text-gray-600 hover:text-blue-600 transition">
          💬 Comment
        </button>

        <button className="text-gray-600 hover:text-blue-600 transition">
          🔄 Share
        </button>
      </div>
    </div>
  );
}
