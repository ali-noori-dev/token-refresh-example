import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
};

export default LoginPage;
