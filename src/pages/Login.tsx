// src/pages/Login.tsx
import React, { useState } from "react";
import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/HeaderFooter/Header";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
      }
      if (res.data?.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      }

      navigate("/posts");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Unexpected error occurred.";
      alert(msg);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/login";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl px-8 py-6 w-full max-w-md space-y-4 border border-gray-700"
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-2 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-md"
          >
            Login with Google
          </button>

          {/* Forgot password link */}
          <p className="text-sm text-center mt-4 text-gray-400">
            <span
              onClick={() => navigate("/user/request-reset-password")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Forgot Password?
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
