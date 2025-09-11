// src/components/common/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 font-medium">{label}</label>
      <input
        {...props}
        className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default Input;
