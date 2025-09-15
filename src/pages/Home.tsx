// src/pages/Home.tsx
import React from "react";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg leading-snug">
          Welcome to Our Blogging App
        </h1>
        <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
          Sign up to view posts and start exploring amazing content from our
          community of writers and creators.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
