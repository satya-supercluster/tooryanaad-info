import React from "react";
import { useData } from "../data/DataContext";
// import RegistrationDashboard from "./RegistrationDashboard";
import CompetitionDashboard from "./CompetitionDashboard"
import { HashLoader } from "react-spinners";


const Home = () => {
  const {combinedData} = useData();
  return (
    <div className="py-10 min-h-screen min-w-screen text-center flex flex-col justify-center items-center bg-slate-700">
      <div className="text-center">
        {combinedData ? (
          <CompetitionDashboard data={combinedData}/>
        ) : (
          <div className="min-h-screen flex justify-center items-center bg-slate-700">
            <HashLoader color="#fff" size={100} />
          </div>
        )}
        {/* <RegistrationDashboard /> */}
      </div>
    </div>
  );
};

export default Home;
