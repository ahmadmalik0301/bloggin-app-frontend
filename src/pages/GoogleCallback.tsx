import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    api
      .get("/user/me")
      .then((res) => {
        if (res.data?.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          navigate("/posts", { replace: true });
        } else {
          throw new Error("No user in response");
        }
      })
      .catch(() => {
        alert("Google login failed.");
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleCallback;
