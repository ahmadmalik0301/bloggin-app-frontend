import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const handledRef = useRef(false);
  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    api
      .get("/user/me")
      .then((res) => {
        if (res.data?.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          toast.success("Login successful! Welcome back.");
          navigate("/posts", { replace: true });
        } else {
          throw new Error("No user in response");
        }
      })
      .catch(() => {
        alert("Google login failed.");
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl px-8 py-6 w-full max-w-md border border-gray-700">
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
            Google Login
          </h1>
          <p className="text-gray-300 text-lg font-medium mb-4">
            Logging in with Google
          </p>
          {/* Animated dots loader */}
          <div className="flex justify-center space-x-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></span>
            <span className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
