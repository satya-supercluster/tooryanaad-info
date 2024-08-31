import React, { useState, useEffect } from "react";
import CompetitionDashboard from "./New";
const App = () => {
  const [combinedData, setCombinedData] = useState(null);
  const [count, setCount] = useState(0);
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



  return (
    <div className="my-5 min-h-screen min-w-screen text-center flex flex-col justify-center items-center ">
      <div className="text-center">
        {combinedData ? (
          <CompetitionDashboard
            data={combinedData}
            count={count}
            setCount={setCount}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
