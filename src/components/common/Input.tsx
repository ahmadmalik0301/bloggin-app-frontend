import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <input
        {...props}
        className="px-3 py-2 rounded-lg 
                   bg-gray-800 text-gray-100 placeholder-gray-500
                   border border-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-500
                   transition duration-300"
      />
    </div>
  );
};

export default Input;
