import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { Heart, MessageSquare, Share2 } from "lucide-react";

export default function PostCard({ post }){
  const [likes, setLikes] = useState(post.likes || 0);
  const toggleLike = ()=> setLikes(likes + 1);

  return (
    <article className="bg-white rounded-2xl shadow-sm p-4 hover-lift">
      <div className="flex items-start gap-3">
        <Avatar src={post.avatar} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{post.user}</div>
              <div className="text-xs text-gray-500">{post.time} ago</div>
            </div>
          </div>

          <p className="mt-3 text-gray-800">{post.text}</p>

          {post.images?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {post.images.map((u,i)=> <img key={i} src={u} className="w-full object-cover rounded-md max-h-56" alt={`img-${i}`} />)}
            </div>
          )}

          {post.videos?.length > 0 && (
            <div className="mt-3 space-y-2">
              {post.videos.map((u,i)=> <video key={i} src={u} controls className="w-full rounded-md max-h-72" />)}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-4">
              <button onClick={toggleLike} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition">
                <Heart size={16} className="text-red-400" />
                <span className="text-sm">{likes}</span>
              </button>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare size={16} />
                <span>{post.comments?.length || 0}</span>
              </div>
            </div>

            <div className="text-sm text-gray-500"><Share2 size={16} /> Share</div>
          </div>
        </div>
      </div>
    </article>
  );
}
