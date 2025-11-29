import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("auth_token");
      setIsLoggedIn(!!token);
      setChecking(false);
    };

    verifyAuth();
  }, []);

  if (checking) return <div>Checking login...</div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

