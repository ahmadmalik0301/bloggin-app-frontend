// src/pages/User/ResetPasswordRequest.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Footer from "../../components/HeaderFooter/Footer";
import Header from "../../components/HeaderFooter/Header";

const ResetPasswordRequest: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/user/request-reset-password", { email });
      if (res.data.status === "success") {
        setMessage(
          res.data.message || "Password reset link sent to your email."
        );
        setEmail("");
      } else {
        setError(res.data.message || "Failed to request password reset.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 text-gray-100 shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-5 border border-gray-700"
        >
          <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Reset Password
          </h1>

          {message && (
            <p className="text-green-400 text-center font-medium">{message}</p>
          )}
          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          <div>
            <label className="block font-semibold mb-1 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-md hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Request Reset Link"}
          </button>

          <p className="text-sm text-center text-gray-400">
            Remembered your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default ResetPasswordRequest;
