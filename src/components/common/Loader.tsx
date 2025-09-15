// src/components/common/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-transparent">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div
          className="absolute w-full h-full 
                     border-4 border-purple-500/30 rounded-full 
                     animate-spin border-t-purple-500"
        ></div>

        {/* Inner glow dot */}
        <div
          className="absolute top-1/2 left-1/2 w-6 h-6 
                     bg-gradient-to-r from-purple-500 to-indigo-500 
                     rounded-full -translate-x-1/2 -translate-y-1/2 
                     animate-pulse shadow-lg shadow-purple-500/50"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
