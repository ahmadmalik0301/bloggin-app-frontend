// src/pages/Login.tsx
import React, { useState } from "react";
import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md space-y-4"
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Login with Google
        </button>

        {/* Forgot password link */}
        <p className="text-sm text-center mt-4">
          <span
            onClick={() => navigate("/user/request-reset-password")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
