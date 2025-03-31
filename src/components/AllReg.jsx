import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useData } from "../data/DataContext";

const RegistrationList = () => {
  const { registrationData } = useData();
  const [search, setSearch] = useState("");

  // Filter data based on search term and count students by year
  const { year1Count, year2Count, filteredData } = useMemo(() => {
    let y1 = 0;
    let y2 = 0;

    const filtered = registrationData.filter((reg) => {
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

    registrationData.forEach((reg) => {
      if (reg.year === "1") y1++;
      else if (reg.year === "2") y2++;
    });

    return { year1Count: y1, year2Count: y2, filteredData: filtered };
  }, [registrationData, search]);

  return (
    <div className="min-h-screen bg-slate-700">
      {/* Navbar with back icon and responsive search box */}
      <nav className="fixed w-full flex items-center justify-between p-4  sm:px-20 h-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white  shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
        <NavLink
          to="/"
          className="flex items-center text-lg font-semibold text-blue-300 hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        </NavLink>
        <div className="flex-1 mx-4 flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 font-extrabold"
          />
        </div>
      </nav>

      {/* Main content */}
      <div className="p-4">
        {/* Year counts */}
        <div className="mb-4 mt-16 flex flex-col font-semibold sm:flex-row justify-center items-center text-gray-100">
          <div className="mb-2 sm:mb-0">
            <span className="mr-4">
              First Year: <strong>{year1Count}</strong>
            </span>
            <span>
              Second Year: <strong>{year2Count}</strong>
            </span>
          </div>
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
                <strong className="text-blue-400">Contact:</strong>{" "}
                {reg.contact}
              </p>
              <p>
                <strong className="text-pink-400">Scholar:</strong>{" "}
                {reg.scholar}
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
    </div>
  );
};

export default RegistrationList;
