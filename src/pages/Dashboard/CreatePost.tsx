import React, { useState } from "react";
import Header from "../../components/HeaderFooter/Header";
import Footer from "../../components/HeaderFooter/Footer";
import Input from "../../components/common/Input";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { title, tagLine, body };
      const res = await api.post("/post", payload);

      if (res.data.status === "success") {
        alert("Post created successfully!");
        navigate("/admin/dashboard");
      } else {
        alert(res.data.message || "Failed to create post");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Unexpected error occurred.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-800 border border-gray-700 shadow-lg rounded-xl px-8 py-6 space-y-5"
        >
          <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Create New Post
          </h2>

          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
          <Input
            label="Tag Line"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            required
            className="bg-gray-900 border-gray-700 text-gray-100"
          />
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">Blog</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold
    transition-transform duration-300 transform 
    ${
      loading
        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 hover:shadow-xl"
    }
  `}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Post
              </>
            )}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CreatePost;
