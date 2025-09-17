import React, { useState } from "react";
import { Heart } from "lucide-react";
import api from "../../services/api";

interface Props {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
}

const LikeButton: React.FC<Props> = ({
  postId,
  initialLiked,
  initialCount,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await api.post(`/like/toggle/${postId}`);
      if (res.data.status === "success") {
        const newLiked = res.data.data.liked;
        setLiked(newLiked);
        setCount((prev) => prev + (newLiked ? 1 : -1));
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-2 transition duration-300 
        ${liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
    >
      <Heart
        className="w-5 h-5 transition-transform duration-300"
        fill={liked ? "currentColor" : "none"}
        strokeWidth={1.8}
      />
      <span className="text-sm font-medium">{count}</span>
    </button>
  );
};

export default LikeButton;
