import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="relative w-16 h-16">
        {/* Spinning Ring */}
        <div
          className="absolute w-full h-full 
                     border-4 border-purple-500/30 rounded-full 
                     animate-spin border-t-purple-500"
        ></div>

        {/* Pulsing Inner Circle */}
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
