import React, { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [combinedData, setCombinedData] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [responseT, responseTG] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_SITE}/T`),
          fetch(`${import.meta.env.VITE_BACKEND_SITE}/TG`),
        ]);

        if (!responseT.ok || !responseTG.ok) {
          throw new Error("Network response was not ok");
        }

        const dataT = await responseT.json();
        const dataTG = await responseTG.json();

        // Combine the data from both endpoints
        const combined = [...dataT.data, ...dataTG.data];
        setCombinedData(combined);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (auth) fetchData();
  }, [auth]);

  return (
    <DataContext.Provider
      value={{
        isLoading,
        combinedData,
        count,
        setCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
