import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";
import Loader from "../components/common/Loader";
import LikedByList from "../components/Post/LikedByList";

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
}

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [likedBy, setLikedBy] = useState<User[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostData = async () => {
    setLoading(true);
    setError(null);

    try {
      const postRes = await api.get(`/post/${id}`);
      if (postRes.data.status === "success") setPost(postRes.data.data);

      // Fetch like count and liked users in one go
      const [countRes, usersRes, statusRes] = await Promise.all([
        api.get(`/like/count/${id}`),
        api.get(`/like/users/${id}`),
        api.get(`/like/status/${id}`),
      ]);

      if (countRes.data.status === "success")
        setLikeCount(countRes.data.data.likeCount);
      if (usersRes.data.status === "success") setLikedBy(usersRes.data.data);
      if (statusRes.data.status === "success")
        setLiked(statusRes.data.data.liked);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const toggleLike = async () => {
    try {
      const res = await api.post(`/like/toggle/${id}`);
      if (res.data.status === "success") {
        const likedNow = res.data.data.liked;
        setLiked(likedNow);
        setLikeCount((prev) => (likedNow ? prev + 1 : prev - 1));

        // Optimistically update likedBy
        const usersRes = await api.get(`/like/users/${id}`);
        if (usersRes.data.status === "success") setLikedBy(usersRes.data.data);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to toggle like");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (!post) return <p className="text-center mt-6">Post not found</p>;

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-4">{post.tagLine}</p>
        <div className="prose max-w-full">{post.body}</div>

        <div className="mt-6 flex items-center gap-4">
          <button
            className={`px-4 py-2 rounded ${
              liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={toggleLike}
          >
            {liked ? "❤️ Liked" : "🤍 Like"} ({likeCount})
          </button>
        </div>

        <LikedByList users={likedBy} />

        <p className="text-gray-400 mt-4">
          Created at: {new Date(post.createdAt).toLocaleString()}
        </p>

        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </main>
      <Footer />
    </>
  );
};

export default PostDetail;
