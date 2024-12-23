import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import React from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // Check login state
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
