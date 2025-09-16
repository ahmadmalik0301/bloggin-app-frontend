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
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />

      <main className="flex-grow flex flex-col items-center gap-6 p-6">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/admin/create-post")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
               bg-gradient-to-r from-purple-500 to-pink-500 text-white
               shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
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
            Add Post
          </button>

          <button
            onClick={() => navigate("/admin/manage-posts")}
            className="px-6 py-3 rounded-xl font-semibold
               bg-indigo-600 text-white shadow-lg
               hover:bg-indigo-500 transition"
          >
            Manage Posts
          </button>
        </div>

        {/* Notifications section */}
        <div className="w-full max-w-lg mt-8 bg-gray-800 border border-gray-700 shadow-lg rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3 text-gray-200">
            Notifications
          </h2>
          {notifications.length === 0 ? (
            <p className="text-gray-500 italic">No notifications yet</p>
          ) : (
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {notifications.map((note, idx) => (
                <li
                  key={note.id || idx}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 p-3 rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 transition"
                >
                  <div className="font-medium text-gray-100">
                    {note.message}
                  </div>
                  <div className="text-xs text-gray-400">
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
