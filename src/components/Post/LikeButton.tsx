// src/components/Post/PostLike.tsx
import React, { useState } from "react";
import { Heart } from "lucide-react";

interface Props {
  postId: string;
}

const LikeButton: React.FC<Props> = ({ postId }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    // 🔑 later call API: POST /like/:id
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-1 ${
        liked ? "text-red-500" : "text-gray-500"
      } hover:text-red-600`}
    >
      <Heart className="w-5 h-5" fill={liked ? "red" : "none"} />
      {liked ? "Liked" : "Like"}
    </button>
  );
};

export default LikeButton;
