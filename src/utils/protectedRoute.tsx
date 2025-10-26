import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const hasAuth = await AuthService.getTokenCookie();
        setIsLoggedIn(!!hasAuth);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setChecking(false);
      }
    };
    verifyAuth();
  }, []);

  if (checking) return <div>Checking login...</div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
