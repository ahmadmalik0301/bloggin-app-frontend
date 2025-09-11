// src/components/Post/PostCard.tsx
import React from "react";
import PostLike from "./LikeButton";

interface Post {
  id: string;
  title: string;
  tagLine: string;
  body: string;
  createdAt: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
      <div>
        <h2 className="text-xl font-bold text-blue-700">{post.title}</h2>
        <p className="text-gray-600">{post.tagLine}</p>
        <p className="mt-3 text-gray-800 line-clamp-3">{post.body}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <small className="text-gray-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </small>
        <PostLike postId={post.id} />
      </div>
    </div>
  );
};

export default PostCard;
