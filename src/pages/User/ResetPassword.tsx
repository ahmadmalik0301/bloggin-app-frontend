import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/HeaderFooter/Header";
import Footer from "../../components/HeaderFooter/Footer";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/user/reset-password", {
        token,
        newPassword,
        confirmPassword,
      });

      if (res.data.status === "success") {
        setMessage(res.data.message || "Password reset successfully.");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message || "Failed to reset password.");
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
            Set a New Password
          </h1>

          {message && (
            <p className="text-green-400 text-center font-medium">{message}</p>
          )}
          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          <div>
            <label className="block font-semibold mb-1 text-gray-300">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-md hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default ResetPassword;
