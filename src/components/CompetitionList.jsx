import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useData } from "../data/DataContext";

const CompetitionList = () => {
  const { combinedData } = useData();
  const [search, setSearch] = useState("");
  const [emailLoading, setEmailLoading] = useState({});

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (search.trim() === "") return combinedData;

    const lowerSearch = search.toLowerCase();
    const searchTerm = search.trim();

    return combinedData.filter((reg) => {
      return (
        (reg.name &&
          typeof reg.name === "string" &&
          reg.name.toLowerCase().includes(lowerSearch)) ||
        (reg.email &&
          typeof reg.email === "string" &&
          reg.email.toLowerCase().includes(lowerSearch)) ||
        (reg.contact &&
          typeof reg.contact === "string" &&
          reg.contact.includes(searchTerm)) ||
        (reg.college &&
          typeof reg.college === "string" &&
          reg.college.toLowerCase().includes(lowerSearch)) ||
        (reg.token &&
          typeof reg.token === "string" &&
          reg.token.toLowerCase().includes(lowerSearch))
      );
    });
  }, [combinedData, search]);

  const handleSendEmail = async (id,email) => {
    setEmailLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_SITE}/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        alert("Email sent successfully");
        // You can add a success notification here
      } else {
        alert("Failed to send email");
        // You can add an error notification here
      }
    } catch (error) {
      alert("Error sending email:", error);
      // You can add an error notification here
    } finally {
      setEmailLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

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
      <div className="p-4 pt-20">
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
                <strong className="text-blue-400">Contact:</strong>{" "}
                {reg.contact}
              </p>
              <p>
                <strong className="text-yellow-400">College:</strong>{" "}
                {reg.college}
              </p>
              <p className="mb-4">
                <strong className="text-orange-400">Competitions:</strong>{" "}
                {reg.competitions && Array.isArray(reg.competitions)
                  ? reg.competitions.join(", ")
                  : ""}
              </p>

              {/* Send Email Button */}
              <button
                onClick={() => handleSendEmail(reg._id,reg.email)}
                disabled={emailLoading[reg._id]}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={emailLoading[reg._id] ? "animate-pulse" : ""}
                />
                <span>
                  {emailLoading[reg._id] ? "Sending..." : "Send Email"}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionList;
