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

  // const [registrationData, setRegistrationData] = useState([]);
  // const [activeTab, setActiveTab] = useState("overview");
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       // Replace with your actual endpoint
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BACKEND_SITE}/countReg25`
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch registration data");
  //       }

  //       const result = await response.json();
  //       setRegistrationData(result.data || []);
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   if(auth) fetchData();
  // }, [auth]);

  return (
    <DataContext.Provider
      value={{
        isLoading,
        combinedData,
        count,
        setCount,
        // registrationData,
        // setRegistrationData,
        // activeTab,
        // setActiveTab,
        // error,
        // setError
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
