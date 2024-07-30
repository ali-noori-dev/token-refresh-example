import { useAuth0 } from "@auth0/auth0-react";
import React, { ComponentType, useEffect } from "react";

interface ProtectedRouteProps {
  component: React.LazyExoticComponent<ComponentType>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return isAuthenticated ? <Component /> : <div>Loading...</div>;
};
