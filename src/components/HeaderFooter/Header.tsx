// src/components/HeaderFooter/Header.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api"; // ✅ axios instance

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isPost = location.pathname.startsWith("/post");

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Unexpected error occurred.";
      alert(msg);
    }
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      {/* Logo / Title */}
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Bloggify
      </div>

      {/* Conditional Buttons */}
      <div className="space-x-4">
        {isHome && (
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
        )}

        {isPost && (
          <>
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={handleLogout} // ✅ call logout
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
