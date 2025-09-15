// src/components/DashboardButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardButton: React.FC = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-5 py-2.5 
                 bg-gradient-to-r from-indigo-600 to-purple-600 
                 text-white font-medium tracking-wide 
                 rounded-xl shadow-md 
                 hover:from-indigo-500 hover:to-purple-500 
                 focus:outline-none focus:ring-2 focus:ring-purple-400/50 
                 transition duration-300"
    >
      Dashboard
    </button>
  );
};

export default DashboardButton;
