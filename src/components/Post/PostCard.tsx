import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

interface Post {
  id: string;
  title: string;
  tagLine: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  liked: boolean;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                 rounded-2xl shadow-lg p-6 flex flex-col justify-between 
                 hover:shadow-purple-700/40 hover:scale-[1.01] transition duration-300 
                 cursor-pointer border border-gray-700"
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <div className="mb-5">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">
          {post.title}
        </h2>
        <p className="text-gray-400 italic mb-3">{post.tagLine}</p>
        <p className="text-gray-300 line-clamp-3">{post.body}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <LikeButton
          postId={post.id}
          initialLiked={post.liked}
          initialCount={post.likeCount}
        />
      </div>
    </div>
  );
};

export default PostCard;
