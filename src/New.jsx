import React, { useMemo } from "react";

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

const CompetitionDashboard = ({ data }) => {
  const { competitionCounts, totalParticipants } = useMemo(() => {
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

    return {
      competitionCounts: counts,
      totalParticipants: uniqueParticipants.size,
    };
  }, [data]);

  return (
    <div className="p-4 bg-slate-300 min-h-screen rounded-lg border-2 border-yellow-500">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        प्रतियोगिता प्रतिभागी संख्या
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 col-span-full">
          <h2 className="text-xl font-semibold mb-2">कुल व्यक्तिगत भागीदारी</h2>
          <p className="text-4xl font-bold text-center">{totalParticipants}</p>
        </div>
        {Object.entries(eventsMap).map(([hindiName, englishName]) => (
          <div
            key={englishName}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold mb-2 text-blue-700">
              {hindiName}
            </h2>
            <p className="text-3xl font-bold text-center text-gray-800">
              {competitionCounts[englishName] || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionDashboard;
