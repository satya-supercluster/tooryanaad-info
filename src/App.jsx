import React, { useState, useEffect } from "react";
import CompetitionDashboard from "./New";
import Excel from './Excel'
const App = () => {
  const [combinedData, setCombinedData] = useState(null);
  const [count, setCount] = useState(0);
  const [passcode, setPasscode] = useState("");
  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, []);

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };

  return (
    <div className="my-5 min-h-screen min-w-screen text-center flex flex-col justify-center items-center ">
      <div className="text-center">
        {combinedData ? (
          <div className="flex flex-col">
            <CompetitionDashboard
              data={combinedData}
              count={count}
              setCount={setCount}
            />
            <input
              type="text"
              value={passcode}
              onChange={handlePasscodeChange}
              placeholder="Enter passcode"
              className="m-4 p-2 border-2 rounded border-red-500"
            />
            {passcode === "satyam" ? (
              <Excel data={combinedData} className="p-4" />
            ) : null}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
