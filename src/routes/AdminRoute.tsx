// src/components/auth/AdminRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
