import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const HomePage: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
