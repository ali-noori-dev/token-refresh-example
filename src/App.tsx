import { useAuth0 } from "@auth0/auth0-react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components";

const HomePage = lazy(() => import("./pages/HomePage"));

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={HomePage} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
