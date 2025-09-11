// src/pages/Register.tsx
import React, { useState } from "react";
import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ axios instance

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ build payload dynamically
    const payload: any = {
      firstName,
      email,
      password,
    };

    if (lastName.trim()) payload.lastName = lastName;
    if (dateOfBirth.trim()) payload.dateOfBirth = dateOfBirth;

    try {
      await api.post("/auth/signup", payload);

      navigate("/login");
      console.log("Signup payload:", payload);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Unexpected error occurred.";
      alert(msg);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = "http://localhost:3000/auth/google/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md space-y-4"
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Sign Up with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
