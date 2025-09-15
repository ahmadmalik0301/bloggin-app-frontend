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
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {user && (
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <p>
              <span className="font-semibold">First Name:</span>{" "}
              {user.firstName}
            </p>
            <p>
              <span className="font-semibold">Last Name:</span> {user.lastName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.role}
            </p>
            <p>
              <span className="font-semibold">Auth Method:</span>{" "}
              {user.provider}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {user.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString()
                : "Not provided"}
            </p>

            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => navigate("/user/change-password")}
            >
              Change Password
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
