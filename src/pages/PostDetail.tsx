import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";
import Loader from "../components/common/Loader";
import LikedByList from "../components/Post/LikedByList";
import { toast } from "react-hot-toast";
import { Heart } from "lucide-react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

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

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [likedBy, setLikedBy] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // pagination states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPostData = async () => {
    setLoading(true);
    setError(null);

    try {
      const postRes = await api.get(`/post/${id}`);
      if (postRes.data.status === "success") {
        setPost(postRes.data.data); // ✅ contains likeCount + liked
      } else {
        setError(postRes.data.message || "Failed to fetch post");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchLikers = async (pageNum: number, append = false) => {
    try {
      const res = await api.get(`/like/users/${id}?page=${pageNum}`);
      if (res.data.status === "success") {
        const { data, meta } = res.data;
        setLikedBy((prev) => (append ? [...prev, ...data] : data));
        setHasMore(meta.page < meta.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch likers:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPostData();
      fetchLikers(1, false);
      setPage(1);
    }
  }, [id]);

  const toggleLike = async () => {
    try {
      const res = await api.post(`/like/toggle/${id}`);
      if (res.data.status === "success") {
        const likedNow = res.data.data.liked;

        setPost((prev) =>
          prev
            ? {
                ...prev,
                liked: likedNow,
                likeCount: prev.likeCount + (likedNow ? 1 : -1),
              }
            : prev
        );

        fetchLikers(1, false);
        setPage(1);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to toggle like"); // ✅ toaster
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <p className="text-red-400 text-center mt-6">{error}</p>;
  if (!post)
    return <p className="text-gray-400 text-center mt-6">Post not found</p>;

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen bg-gray-900 text-gray-100">
        <div className="max-w-4xl mx-auto rounded-xl shadow-lg p-6 bg-gray-900">
          {/* Title */}
          <h1 className="text-4xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-md">
            {post.title}
          </h1>
          <p className="text-gray-400 text-center mb-6 italic">
            {post.tagLine}
          </p>

          {/* Body */}
          <div className="prose prose-invert max-w-full leading-relaxed text-lg bg-gray-800 p-6 rounded-xl shadow-inner">
            {post.body}
          </div>

          {/* Like button */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-md ${
                post.liked
                  ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:scale-105"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  post.liked ? "fill-current text-white" : "text-gray-300"
                }`}
                fill={post.liked ? "currentColor" : "none"} // ❤️ filled if liked
              />
              <span>{post.likeCount}</span>
            </button>
          </div>

          {/* Likers list */}
          <div className="mt-6">
            <LikedByList users={likedBy} />
          </div>

          {/* Load more button */}
          {hasMore && (
            <div className="mt-6 text-center">
              <button
                className="px-5 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all"
                onClick={() => {
                  const nextPage = page + 1;
                  fetchLikers(nextPage, true);
                  setPage(nextPage);
                }}
              >
                Load More
              </button>
            </div>
          )}

          {/* Meta info */}
          <p className="text-gray-500 text-sm mt-6 text-center">
            Created at: {new Date(post.createdAt).toLocaleString()}
          </p>

          {/* Back button */}
          <div className="mt-6 text-center">
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-all shadow-md"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostDetail;
