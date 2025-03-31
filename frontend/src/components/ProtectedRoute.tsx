import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token"); // Read token directly

  if (!user && !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
