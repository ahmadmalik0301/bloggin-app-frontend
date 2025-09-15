// src/pages/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/HeaderFooter/Header";
import Footer from "../../components/HeaderFooter/Footer";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  provider: string;
  dateOfBirth?: string | null;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/user/me");
      if (res.data.status === "success") {
        const userData = res.data.data.user || res.data.data;
        setUser(userData);
      } else {
        setError(res.data.message || "Failed to load profile");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loader />;
  if (error)
    return <p className="text-red-400 text-center mt-6 font-medium">{error}</p>;

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {user && (
          <div className="bg-gray-800 text-gray-100 shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-gray-700 space-y-4">
            <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
              Dashboard
            </h1>

            <div className="space-y-3">
              <p>
                <span className="font-semibold text-gray-300">First Name:</span>{" "}
                {user.firstName}
              </p>
              <p>
                <span className="font-semibold text-gray-300">Last Name:</span>{" "}
                {user.lastName}
              </p>
              <p>
                <span className="font-semibold text-gray-300">Email:</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-semibold text-gray-300">Role:</span>{" "}
                {user.role}
              </p>
              <p>
                <span className="font-semibold text-gray-300">
                  Auth Method:
                </span>{" "}
                {user.provider}
              </p>
              <p>
                <span className="font-semibold text-gray-300">
                  Date of Birth:
                </span>{" "}
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "Not provided"}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-500 hover:to-purple-500 transition-all"
                onClick={() => navigate("/user/change-password")}
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
