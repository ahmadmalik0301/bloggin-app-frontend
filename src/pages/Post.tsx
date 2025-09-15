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
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setPage(pageNum);
                    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ scroll to top
                  }}
                  className={`px-4 py-2 rounded transition ${
                    page === pageNum
                      ? "bg-blue-500 text-white font-semibold shadow-md"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default PostPage;
