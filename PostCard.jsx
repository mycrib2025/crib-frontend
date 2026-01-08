import React, { useState } from "react";

export default function PostCard({
  avatar,
  username,
  content,
  images = [],
  videos = [],
  likes = 0,
  comments = [],
  timestamp = "Just now",
}) {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 transition hover:shadow-md">
      {/* USER INFO */}
      <div className="flex items-center mb-3">
        <img
          src={avatar || "https://via.placeholder.com/40"}
          alt={username}
          className="w-11 h-11 rounded-full object-cover mr-3 border"
        />

        <div>
          <p className="font-semibold text-gray-800">{username || "Anonymous"}</p>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
      </div>

      {/* POST CONTENT TEXT */}
      <p className="text-gray-800 mb-3 whitespace-pre-line">{content}</p>

      {/* IMAGE GALLERY */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`post-img-${idx}`}
              className="w-full h-56 object-cover rounded-lg shadow-sm hover:opacity-90 transition"
            />
          ))}
        </div>
      )}

      {/* VIDEO SECTION */}
      {videos.length > 0 && (
        <div className="space-y-2 mb-4">
          {videos.map((url, idx) => (
            <video
              key={idx}
              src={url}
              controls
              className="w-full max-h-72 rounded-lg shadow-sm"
            />
          ))}
        </div>
      )}

      {/* ACTION BAR */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-2">
        {/* LIKE BUTTON */}
        <button
          onClick={toggleLike}
          className={`flex items-center gap-1 text-sm font-semibold transition active:scale-95 
            ${
              liked
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
        >
          <span>{liked ? "❤️" : "🤍"}</span>
          {likeCount}
        </button>

        {/* COMMENT COUNT */}
        <p className="text-sm text-gray-600">
          💬 {comments.length} comments
        </p>
      </div>
    </div>
  );
}
