import React, { useState } from "react";

export default function CreatePostForm({ onCreate }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      avatar: "https://via.placeholder.com/40",
      username: "Current User",
      content,
      images,
      videos,
      likes: 0,
      comments: [],
    });
    setContent("");
    setImages([]);
    setVideos([]);
  };

  const handleFiles = (e, setFiles) => {
    const urls = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setFiles(urls);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 transition hover:shadow-md"
    >
      {/* TEXT AREA */}
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      {/* IMAGE UPLOAD */}
      <div className="mb-3">
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Add Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e, setImages)}
          className="text-sm"
        />
      </div>

      {/* VIDEO UPLOAD */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Add Videos
        </label>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={(e) => handleFiles(e, setVideos)}
          className="text-sm"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition active:scale-95"
      >
        Post
      </button>
    </form>
  );
}
