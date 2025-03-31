import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useData } from "../data/DataContext";
import AnimatedDiv from "./AnimatedDiv";
import ExcelReg from "./ExcelReg";

const verticals = [
  "प्रबंधक",
  "अभिकल्पक",
  "वेब अभिकल्पक",
  "छायाकार",
  "सम्पादक",
  "हिन्दीतर भाषी",
  "वीडियो सम्पादक",
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#A4DE6C",
];

const RegistrationDashboard = () => {
  const { registrationData } = useData();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Process the registration data for counts and pie chart visualization
  const { verticalCounts, totalCount, pieChartData } = useMemo(() => {
    const counts = {};
    verticals.forEach((vertical) => {
      counts[vertical] = 0;
    });

    registrationData.forEach((registration) => {
      if (registration.vertical && Array.isArray(registration.vertical)) {
        registration.vertical.forEach((v) => {
          counts[v] = (counts[v] || 0) + 1;
        });
      }
    });

    const total = registrationData.length;
    const pieData = verticals.map((vertical) => ({
      name: vertical,
      value: counts[vertical] || 0,
    }));

    return {
      verticalCounts: counts,
      totalCount: total,
      pieChartData: pieData,
    };
  }, [registrationData]);

  return (
    <div className="min-h-screen rounded-lg" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="text-lg font-bold py-5 text-green-500"
      >
        आह्वान'25
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-b-2 pb-4 border-white">
        {/* Left column: Total count and breakdown cards */}
        <div className="space-y-4">
          <AnimatedDiv className="bg-green-500 text-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">कुल पंजीकरण</h2>
            <p className="text-4xl font-bold text-center">
              {inView ? (
                <CountUp start={0} end={totalCount} duration={2} />
              ) : (
                totalCount
              )}
            </p>
          </AnimatedDiv>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {verticals.map((vertical) => (
              <AnimatedDiv
                key={vertical}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 max-sm:min-w-[40vw]"
              >
                <div className="flex-col justify-center items-center">
                  <h2 className="text-sm font-semibold mb-2 text-green-700">
                    {vertical}
                  </h2>
                  <p className="text-2xl font-bold text-center text-gray-800">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={verticalCounts[vertical] || 0}
                        duration={2}
                      />
                    ) : (
                      verticalCounts[vertical] || 0
                    )}
                  </p>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </div>
        {/* Right column: Pie chart visualization */}
        <AnimatedDiv className="bg-white overflow-x-hidden rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-700">
            पंजीकरण वितरण
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </AnimatedDiv>
      </div>

      <NavLink
        to="/list"
        className="p-2 bg-blue-700 text-white rounded-lg shadow-lg block text-center mt-4"
      >
        Show/Search Data
      </NavLink>

      <hr className="mt-4" />
      <hr />

      {/* Excel Download Component */}
      <div className="mt-6">
        <ExcelReg data={registrationData} />
      </div>
    </div>
  );
};

export default RegistrationDashboard;
