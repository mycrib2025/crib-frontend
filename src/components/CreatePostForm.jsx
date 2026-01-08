import { useState } from "react";

export default function CreatePostForm({ onCreate }) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("happy");

  const submit = () => {
    if (!text.trim()) return;

    onCreate({
      id: Date.now(),
      text,
      mood,
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening on CRIB?"
        className="w-full border rounded p-2"
      />

      <div className="flex justify-between items-center">
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="chill">😌 Chill</option>
          <option value="angry">😡 Angry</option>
          <option value="excited">🔥 Excited</option>
        </select>

        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </div>
    </div>
  );
}