// src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/common/Input";

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle classic signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      firstName,
      email,
      password,
    };
    if (lastName.trim()) payload.lastName = lastName;
    if (dateOfBirth.trim()) payload.dateOfBirth = dateOfBirth;

    try {
      await axios.post("http://localhost:3000/auth/signup", payload);
      navigate("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Unexpected error occurred.";
      alert(msg);
    }
  };

  // Handle Google OAuth signup via popup
  const handleGoogleSignUp = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      "http://localhost:3000/auth/google/login",
      "GoogleLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const receiveMessage = (event: MessageEvent) => {
      // Only accept messages from backend origin
      if (event.origin !== "http://localhost:3000") return;

      const { token } = event.data;
      if (token) {
        localStorage.setItem("accessToken", token);
        window.removeEventListener("message", receiveMessage);
        popup?.close();
        navigate("/"); // redirect after login
      }
    };

    window.addEventListener("message", receiveMessage);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      {/* Signup Form */}
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
