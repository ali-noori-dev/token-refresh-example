import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { TestApiComponent } from "../components";

const HomePage: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <div>
      <TestApiComponent />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
