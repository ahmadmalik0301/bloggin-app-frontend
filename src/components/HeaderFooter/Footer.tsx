// src/components/HeaderFooter/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 py-6">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="text-purple-400 font-semibold">MyBlog</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
