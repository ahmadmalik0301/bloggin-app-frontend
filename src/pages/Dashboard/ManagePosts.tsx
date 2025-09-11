// src/pages/admin/ManagePosts.tsx
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

  // For update modal
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

  // Delete a post
  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/post/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
      alert("Post deleted successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete post");
    }
  };

  // Update post
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
      <main className="p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Manage Posts</h1>

        {loading && <Loader />}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Tagline</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{post.title}</td>
                    <td className="py-2 px-4">{post.tagLine}</td>
                    <td className="py-2 px-4">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 flex gap-2 justify-center">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
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
          </>
        )}

        {/* Update Modal */}
        {editingPost && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Update Post</h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Title</label>
                  <input
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Tagline</label>
                  <input
                    value={editingPost.tagLine}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        tagLine: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Body</label>
                  <textarea
                    value={editingPost.body}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, body: e.target.value })
                    }
                    className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    rows={5}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
