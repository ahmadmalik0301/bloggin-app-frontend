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
      <main className="p-6 min-h-screen max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <div>
            <label className="block font-semibold mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Request Reset Link"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </main>
      <Footer />
    </>
  );
};

export default ResetPasswordRequest;
