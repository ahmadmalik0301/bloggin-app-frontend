// src/components/HeaderFooter/Header.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import DashboardButton from "../common/DashboardButton";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // All unprotected/public routes
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
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 mb-2 text-white py-4 px-6 flex justify-between items-center">
      {/* Logo / Title */}
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/posts")}
      >
        Bloggify
      </div>

      {/* Conditional Buttons */}
      <div className="space-x-4">
        {isUnprotected ? (
          <>
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <DashboardButton />
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
