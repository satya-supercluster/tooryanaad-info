import React from "react";
import { useData } from "../data/DataContext";
import RegistrationDashboard from "./RegistrationDashboard";
const Home = () => {
  return (
    <div className="py-10 min-h-screen min-w-screen text-center flex flex-col justify-center items-center bg-slate-700">
      <div className="text-center">
        {/* {combinedData ? (
          
        ) : (
          <p>Loading...</p>
        )} */}
        <RegistrationDashboard />
      </div>
    </div>
  );
};

export default Home;
