import React, { useMemo, useEffect, useState } from "react";
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
import Excel from "./ExcelData";
import { useData } from "../data/DataContext";
import AnimatedDiv from "./AnimatedDiv";
const eventsMap = {
  "कवि सम्मेलन": "kaviSammelan",
  "अभिव्यक्ति गायन": "abhivyaktiGayan",
  चक्रव्यूह: "chakravyuh",
  सृजन: "srijan",
  "डिजिटल सृजन": "digitalSrijan",
  "अभिव्यक्ति मंच": "abhivyaktiManch",
  "अभिव्यक्ति नृत्य": "abhivyaktiNritya",
  परिधानिका: "paridhanika",
  "भाषा संगमम्": "bhashaSangam",
  "छात्र संसद": "chhatraSansad",
  खिचड़ी: "khichdi",
  लेखन: "lekhan",
  "नुक्कड़ नाटक": "nukkadNatak",
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#A4DE6C",
  "#D0ED57",
  "#FFC658",
  "#FFD700",
  "#FF69B4",
  "#BA55D3",
  "#20B2AA",
];

const CompetitionDashboard = ({ data }) => {
  const { count, setCount } = useData();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { competitionCounts, totalParticipants, pieChartData } = useMemo(() => {
    const counts = {};
    Object.values(eventsMap).forEach((event) => {
      counts[event] = 0;
    });

    const uniqueParticipants = new Set();

    data.forEach((participant) => {
      uniqueParticipants.add(participant._id);
      participant.competitions.forEach((competition) => {
        counts[competition] = (counts[competition] || 0) + 1;
      });
    });

    const pieData = Object.entries(eventsMap).map(
      ([hindiName, englishName]) => ({
        name: hindiName,
        value: counts[englishName] || 0,
      })
    );

    return {
      competitionCounts: counts,
      totalParticipants: uniqueParticipants.size,
      pieChartData: pieData,
    };
  }, [data]);

  useEffect(() => {
    const totalCount = Object.values(competitionCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    setCount(totalCount);
  }, [competitionCounts, setCount]);

  return (
    <div className="p-4 min-h-screen rounded-lg" ref={ref}>
      <motion.h1
        className="text-2xl max-sm:text-xl font-extrabold mb-6 text-center text-white"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        प्रतियोगिता प्रतिभागी संख्या
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-b-2 pb-4 border-white">
        <div className="space-y-4">
          <AnimatedDiv className="bg-blue-500 text-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">
              कुल व्यक्तिगत भागीदारी
            </h2>
            <p className="text-4xl font-bold text-center">
              {inView ? (
                <CountUp start={0} end={totalParticipants} duration={2} />
              ) : (
                totalParticipants
              )}
            </p>
          </AnimatedDiv>
          <AnimatedDiv className="bg-yellow-500 text-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">
              कुल प्रतियोगिता भागीदारी
            </h2>
            <p className="text-4xl font-bold text-center">
              {inView ? <CountUp start={0} end={count} duration={2} /> : count}
            </p>
          </AnimatedDiv>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
            {Object.entries(eventsMap).map(([hindiName, englishName]) => (
              <AnimatedDiv
                key={englishName}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-sm font-semibold mb-2 text-blue-700">
                  {hindiName}
                </h2>
                <p className="text-2xl font-bold text-center text-gray-800">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={competitionCounts[englishName] || 0}
                      duration={2}
                    />
                  ) : (
                    competitionCounts[englishName] || 0
                  )}
                </p>
              </AnimatedDiv>
            ))}
          </div>
        </div>
        <AnimatedDiv className="bg-white overflow-x-hidden rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 ">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
            प्रतियोगिता वितरण
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
      <div className="flex flex-col justify-center items-center">
        <AnimatedDiv className="my-4 text-xl font-bold text-white">Excel Sheets</AnimatedDiv>
        <Excel data={data} className="p-4" />
      </div>
    </div>
  );
};

export default CompetitionDashboard;
