import React, { useState } from "react";
import { MOODS } from "../lib/moods";

export default function CreatePostForm({ addPost }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...urls]);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setVideos([...videos, ...urls]);
  };

  const submitPost = (event) => {
    event.preventDefault();

    if (!content.trim() && images.length === 0 && videos.length === 0) return;

    const newPost = {
      id: Date.now(),
      username: "You",
      avatar: "/assets/default-avatar.png",
      content,
      images,
      videos,
      likes: 0,
      comments: [],
      timestamp: "Just now"
    };

    addPost(newPost);
    setContent("");
    setImages([]);
    setVideos([]);
  };

  return (
    <form
      onSubmit={submitPost}
      className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-200"
    >
      <div className="flex items-start gap-3">
        {/* Avatar Placeholder */}
        <img
          src="/assets/default-avatar.png"
          alt="You"
          className="w-10 h-10 rounded-full object-cover"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening on CRIB?"
          className="w-full resize-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          rows="3"
        ></textarea>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-32 rounded-md object-cover"
            />
          ))}
        </div>
      )}

      {/* Video Preview */}
      {videos.length > 0 && (
        <div className="space-y-2 mt-3">
          {videos.map((vid, i) => (
            <video
              key={i}
              src={vid}
              controls
              className="w-full h-48 rounded-md"
            />
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-4">
          <label className="cursor-pointer text-blue-600 font-semibold">
            📷 Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple
            />
          </label>

          <label className="cursor-pointer text-purple-600 font-semibold">
            🎥 Video
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
              multiple
            />
          </label>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Post
        </button>
      </div>
    </form>
  );
}
