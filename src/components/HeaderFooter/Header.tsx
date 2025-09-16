import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import DashboardButton from "../common/DashboardButton";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const unprotectedPaths = [
    "/",
    "/login",
    "/register",
    "/user/request-reset-password",
    "/user/reset-password",
  ];

  const isUnprotected = unprotectedPaths.includes(location.pathname);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Unexpected error occurred.";
      alert(msg);
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-4 px-6 flex justify-between items-center shadow-md">
      <div
        className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition"
        onClick={() => navigate("/posts")}
      >
        Bloggify
      </div>

      <div className="space-x-3">
        {isUnprotected ? (
          <>
            <button
              className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <DashboardButton />
            <button
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
