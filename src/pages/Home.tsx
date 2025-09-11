// src/pages/Home.tsx
import React from "react";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blogging App</h1>
        <p className="text-lg text-gray-700">
          Sign up to view posts and start exploring amazing content!
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
