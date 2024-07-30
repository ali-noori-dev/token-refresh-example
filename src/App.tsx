import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Routes } from "react-router-dom";

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Routes></Routes>;
};

export default App;
