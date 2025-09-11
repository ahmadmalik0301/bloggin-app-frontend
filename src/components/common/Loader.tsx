// src/components/common/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute w-full h-full border-4 border-blue-300 rounded-full animate-spin border-t-transparent"></div>

        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
