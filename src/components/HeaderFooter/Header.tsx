import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import DashboardButton from "../common/DashboardButton";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);

  const unprotectedPaths = [
    "/",
    "/login",
    "/register",
    "/user/request-reset-password",
    "/user/reset-password",
  ];

  const isUnprotected = unprotectedPaths.includes(location.pathname);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will have to login again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout!",
      background: "linear-gradient(to right, #1f2937, #111827)",
      color: "#f9fafb",
    });

    if (!result.isConfirmed) return;

    setLoggingOut(true);
    const toastId = toast.loading("Logging out...");

    try {
      const res = await api.post("/auth/logout");

      if (res.data?.status === "error") {
        const msg = res.data?.message || "Unexpected error occurred.";
        toast.error(msg, { id: toastId });
        setLoggingOut(false);
        return;
      }

      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      toast.success("Logged out successfully!", { id: toastId });
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Unexpected error occurred.";
      toast.error(msg, { id: toastId });
      setLoggingOut(false);
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
              className={`px-4 py-2 rounded-lg bg-red-600 text-white font-medium transition ${
                loggingOut
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-500"
              }`}
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
