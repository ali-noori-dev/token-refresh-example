import React, { useEffect } from "react";
import { api } from "../api";

export const TestApiComponent: React.FC = () => {
  useEffect(() => {
    const testApiCall = async () => {
      try {
        const response = await api.get("/get");
        console.log(response.data);
      } catch (error) {
        console.error("API call failed", error);
      }
    };

    testApiCall();
  }, []);

  return (
    <div>
      <h1>Test API Component</h1>
      <p>Check the console for the API response.</p>
    </div>
  );
};
