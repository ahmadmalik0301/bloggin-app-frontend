// src/pages/AdminDashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderFooter/Header";
import Footer from "../../components/HeaderFooter/Footer";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/admin/create-post")}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Add Post
          </button>
          <button
            onClick={() => navigate("/admin/manage-posts")}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Manage Posts
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
