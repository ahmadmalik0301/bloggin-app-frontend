import React, { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";
import PostList from "../components/Post/PostList";
import Loader from "../components/common/Loader";

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
      const res = await api.get(`/post?page=${pageNumber}&limit=6`);

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
      <main className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
          Posts
        </h1>

        {/* Loader */}
        {loading && <Loader />}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center font-medium mt-4">{error}</p>
        )}

        {/* Post list */}
        {!loading && !error && <PostList posts={posts} />}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setPage(pageNum);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-md ${
                    page === pageNum
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
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
