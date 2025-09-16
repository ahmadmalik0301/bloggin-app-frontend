import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import api from "../../services/api";

interface Props {
  postId: string;
}

const LikeButton: React.FC<Props> = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const countRes = await api.get(`/like/count/${postId}`);
        if (countRes.data.status === "success") {
          setCount(countRes.data.data.likeCount);
        }

        const statusRes = await api.get(`/like/status/${postId}`);
        if (statusRes.data.status === "success") {
          setLiked(statusRes.data.data.liked);
        }
      } catch (err) {
        console.error("Failed to fetch like info:", err);
      }
    };

    fetchLikes();
  }, [postId]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await api.post(`/like/toggle/${postId}`);
      if (res.data.status === "success") {
        setLiked(res.data.data.liked);

        setCount((prev) => prev + (res.data.data.liked ? 1 : -1));
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
