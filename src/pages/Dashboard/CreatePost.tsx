// src/pages/admin/CreatePost.tsx
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
      <main className="p-6 min-h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white shadow-md rounded px-8 py-6 space-y-4"
        >
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            label="Tag Line"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            required
          />
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Blog</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CreatePost;
