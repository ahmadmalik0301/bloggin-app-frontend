// src/components/HeaderFooter/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 border-t border-gray-200 py-6 mt-10">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-white text-sm">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
