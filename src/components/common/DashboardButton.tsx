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
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Dashboard
    </button>
  );
};

export default DashboardButton;
