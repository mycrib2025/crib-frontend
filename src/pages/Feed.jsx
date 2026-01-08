import { useState } from "react";
import MoodSelector from "../components/MoodSelector";
import MoodBackground from "../components/MoodBackground";
import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [mood, setMood] = useState("happy");
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([{ ...post, mood }, ...posts]);
  };

  return (
    <>
      {/* 🔥 THIS makes background change */}
      <MoodBackground mood={mood} />

      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-3xl font-bold mb-2">CRIB Feed</h1>

        <MoodSelector value={mood} onChange={setMood} />

        <CreatePostForm onCreate={addPost} />

        <div className="mt-6 space-y-6">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}