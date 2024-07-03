import React, { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SITE}/A_Count`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="min-h-screen min-w-screen text-center flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Document Count</h1>
        {count !== null ? (
          <p className="text-xl">Total count: {count}</p>
        ) : (
          <p className="text-xl">Loading count...</p>
        )}
      </div>
    </div>
  );
};

export default App;
