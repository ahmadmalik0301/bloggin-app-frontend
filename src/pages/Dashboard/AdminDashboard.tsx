// src/pages/AdminDashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderFooter/Header";
import Footer from "../../components/HeaderFooter/Footer";
import { useAdminNotifications } from "../../hooks/useAdminNotifications"; // ✅ custom hook

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const notifications = useAdminNotifications(token);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-6 p-6">
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

        {/* ✅ Notifications section */}
        <div className="w-full max-w-lg mt-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications yet</p>
          ) : (
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.map((note, idx) => (
                <li
                  key={note.id || idx}
                  className="bg-blue-100 p-2 rounded text-blue-800 shadow-sm"
                >
                  <div className="font-medium">{note.message}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
