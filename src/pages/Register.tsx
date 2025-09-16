// src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/common/Input";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = { firstName, email, password };
    if (lastName.trim()) payload.lastName = lastName;
    if (dateOfBirth.trim()) payload.dateOfBirth = dateOfBirth;

    try {
      await axios.post(`${apiUrl}/auth/signup`, payload);
      navigate("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Unexpected error occurred.";
      alert(msg);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${apiUrl}/auth/google/login`;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl px-8 py-6 w-full max-w-md space-y-4 border border-gray-700"
        >
          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
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
            Sign Up
          </button>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full mt-2 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-md"
          >
            Sign Up with Google
          </button>

          {/* Already have account link */}
          <p className="text-sm text-center mt-4 text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
