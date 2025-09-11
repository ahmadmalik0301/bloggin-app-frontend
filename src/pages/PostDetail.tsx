// src/pages/Post.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";
import PostList from "../components/Post/PostList";
import Loader from "../components/common/Loader"; // ✅ import loader

interface Post {
  id: string;
  title: string;
  tagLine: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/post?page=${pageNumber}&limit=5`);

      if (res.data.status === "success") {
        setPosts(res.data.data);
        setTotalPages(res.data.meta.totalPages);
      } else {
        setError(res.data.message || "Failed to fetch posts");
      }
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>

        {/* Loader */}
        {loading && <Loader />}

        {/* Error */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Post list */}
        {!loading && !error && <PostList posts={posts} />}

        {/* Pagination */}
        {!loading && !error && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
              ⬅ Prev
            </button>
            <span className="text-lg font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
              Next ➡
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default PostPage;
