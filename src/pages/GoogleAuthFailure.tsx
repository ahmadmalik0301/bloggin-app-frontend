// src/pages/AuthFailure.tsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const AuthFailure: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error") || "Google login failed";

    toast.error(error);

    // redirect back to login after showing error
    navigate("/login", { replace: true });
  }, [navigate, location]);

  return null;
};

export default AuthFailure;
