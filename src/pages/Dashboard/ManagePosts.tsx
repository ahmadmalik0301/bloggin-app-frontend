import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderFooter/Header";
import Footer from "../../components/HeaderFooter/Footer";
import api from "../../services/api";
import Loader from "../../components/common/Loader";

interface Post {
  id: string;
  title: string;
  tagLine: string;
  body: string;
  createdAt: string;
}

const ManagePosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [updating, setUpdating] = useState(false);

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
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/post/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
      alert("Post deleted successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete post");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPost) return;

    setUpdating(true);
    try {
      const res = await api.patch(`/post/${editingPost.id}`, {
        title: editingPost.title,
        tagLine: editingPost.tagLine,
        body: editingPost.body,
      });

      const updatedPost = res.data.data;
      setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      setEditingPost(null);
      alert("Post updated successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update post");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen bg-gray-900 text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Manage Posts</h1>

        {loading && <Loader />}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <>
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Tagline</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="py-3 px-4">{post.title}</td>
                    <td className="py-3 px-4">{post.tagLine}</td>
                    <td className="py-3 px-4">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 flex gap-2 justify-center">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="px-3 py-1 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1 rounded-md bg-red-600 text-white font-medium hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded-md bg-gray-700 text-gray-100 font-medium disabled:opacity-50 hover:bg-gray-600 transition"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    page === i + 1
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded-md bg-gray-700 text-gray-100 font-medium disabled:opacity-50 hover:bg-gray-600 transition"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Update Modal */}
        {editingPost && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-800 border border-gray-700 text-gray-100 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Update Post</h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-gray-300 font-medium">
                    Title
                  </label>
                  <input
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-gray-300 font-medium">
                    Tagline
                  </label>
                  <input
                    value={editingPost.tagLine}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        tagLine: e.target.value,
                      })
                    }
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-gray-300 font-medium">Body</label>
                  <textarea
                    value={editingPost.body}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, body: e.target.value })
                    }
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
                    rows={5}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="px-4 py-2 rounded-md bg-gray-600 text-gray-200 hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition"
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ManagePosts;
