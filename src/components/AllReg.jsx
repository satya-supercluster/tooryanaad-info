import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useData } from "../data/DataContext";

const RegistrationList = () => {
  const { registrationData } = useData();
  const [search, setSearch] = useState("");

  // Filter data based on search term and count students by year
  const { year1Count, year2Count, filteredData } = useMemo(() => {
    let y1 = 0;
    let y2 = 0;

    // Filter registrationData based on search (if any)
    const filtered = registrationData.filter((reg) => {
      // Convert search query and registration fields to lower case for case insensitive comparison
      if (search.trim() === "") return true;
      const lowerSearch = search.toLowerCase();
      return (
        (reg.name && reg.name.toLowerCase().includes(lowerSearch)) ||
        (reg.token && reg.token.toLowerCase().includes(lowerSearch)) ||
        (reg.email && reg.email.toLowerCase().includes(lowerSearch)) ||
        (reg.contact && reg.contact.includes(search.trim())) ||
        (reg.scholar && reg.scholar.includes(search.trim()))
      );
    });

    // Count year 1 and year 2 registrations (assuming year is stored as a string)
    registrationData.forEach((reg) => {
      if (reg.year === "1") y1++;
      else if (reg.year === "2") y2++;
    });

    return { year1Count: y1, year2Count: y2, filteredData: filtered };
  }, [registrationData, search]);

  return (
    <div className="p-4 bg-slate-700 min-h-screen">
      <motion.h2
        className="text-2xl font-bold my-4 text-center text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Student Registrations
      </motion.h2>

      {/* Year counts and search bar */}
      <div className="mb-4 flex flex-col  font-semibold sm:flex-row justify-center items-center text-gray-100">
        <div className="mb-2 sm:mb-0">
          <span className="mr-4">
            First Year: <strong>{year1Count}</strong>
          </span>
          <span>
            Second Year: <strong>{year2Count}</strong>
          </span>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <input
          type="text"
          placeholder="Search by name, token, email, or contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:min-w-[300px] text-blue-600 font-extrabold"
        />
      </div>
      {/* Registration data list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((reg) => (
          <motion.div
            key={reg._id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-cyan-400">
              {reg.name}
            </h3>
            <p>
              <strong className="text-purple-400">Token:</strong> {reg.token}
            </p>
            <p>
              <strong className="text-green-400">Email:</strong> {reg.email}
            </p>
            <p>
              <strong className="text-yellow-400">Year:</strong> {reg.year}
            </p>
            <p>
              <strong className="text-blue-400">Contact:</strong> {reg.contact}
            </p>
            <p>
              <strong className="text-pink-400">Scholar:</strong> {reg.scholar}
            </p>
            <p>
              <strong className="text-red-400">Branch:</strong> {reg.branch}
            </p>
            <p>
              <strong className="text-orange-400">Vertical:</strong>{" "}
              {reg.vertical && Array.isArray(reg.vertical)
                ? reg.vertical.join(", ")
                : ""}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationList;
