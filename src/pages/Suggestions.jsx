import React, { useEffect, useState } from "react";
import { Follow } from "../lib/api";

export default function Suggestions({ currentUserId }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load() {
    try {
      const res = await Follow.suggestions(currentUserId);
      setSuggestions(res.suggestions || []);
    } catch(e){ console.error(e); }
  }

  async function follow(userId) {
    try {
      await Follow.follow(userId, currentUserId);
      await load();
    } catch(e){ console.error(e); }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">People you may know</h2>
      {suggestions.length === 0 ? <div>No suggestions yet</div> : suggestions.map(s => (
        <div key={s._id} className="flex items-center justify-between p-2 border-b">
          <div>
            <div className="font-semibold">{s.name}</div>
            <div className="text-sm text-gray-500">Mutual: {s.mutualCount || 0}</div>
          </div>
          <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={()=>follow(s._id)}>Follow</button>
        </div>
      ))}
    </div>
  );
}
