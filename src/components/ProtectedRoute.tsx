import { useAuth0 } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  component: React.LazyExoticComponent<ComponentType>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
