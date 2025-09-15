import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

interface Post {
  id: string;
  title: string;
  tagLine: string;
  body: string;
  createdAt: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 flex flex-col justify-between
                 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <div className="mb-5">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
          {post.title}
        </h2>
        <p className="text-gray-500 italic mb-3">{post.tagLine}</p>
        <p className="text-gray-700 line-clamp-3">{post.body}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-400 text-sm">
          {new Date(post.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <LikeButton postId={post.id} />
      </div>
    </div>
  );
};

export default PostCard;
