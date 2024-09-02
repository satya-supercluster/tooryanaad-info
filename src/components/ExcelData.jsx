import React from "react";
import * as XLSX from "xlsx";
import AnimatedDiv from "./AnimatedDiv";

const Excel = ({ data }) => {
  const competitions = [
    "kaviSammelan",
    "abhivyaktiGayan",
    "chakravyuh",
    "srijan",
    "digitalSrijan",
    "abhivyaktiManch",
    "abhivyaktiNritya",
    "paridhanika",
    "bhashaSangam",
    "chhatraSansad",
    "khichdi",
    "lekhan",
    "nukkadNatak",
  ];

  const generateExcel = (sheetData, fileName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, "Participants");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }

    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    if (data.length === 0) {
      alert("No data to export!");
      return;
    }

    const allData = data.map((item) => {
      const rowData = {
        token: item.token,
        name: item.name,
        email: item.email,
        contact: item.contact,
        college: item.college,
      };

      item.competitions.forEach((comp, index) => {
        rowData[`competition[${index}]`] = comp;
      });

      for (let i = item.competitions.length; i < competitions.length; i++) {
        rowData[`competition[${i}]`] = "";
      }

      return rowData;
    });

    generateExcel(allData, "all_participants_data.xlsx");
  };

  const handleDownloadCompetition = (competition) => {
    const competitionData = data
      .filter((item) => item.competitions.includes(competition))
      .map((item) => ({
        token: item.token,
        name: item.name,
        teamName: item.teamName || "",
        email: item.email,
        contact: item.contact,
        college: item.college,
      }));

    if (competitionData.length === 0) {
      alert(`No participants for ${competition}`);
      return;
    }

    generateExcel(competitionData, `${competition}_participants.xlsx`);
  };

  return (
    <div className="space-y-4">
      <AnimatedDiv>
        <button
          onClick={handleDownloadAll}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Download All Data
        </button>
      </AnimatedDiv>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {competitions.map((competition) => (
          <AnimatedDiv>
            <button
              key={competition}
              onClick={() => handleDownloadCompetition(competition)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              {competition}
            </button>
          </AnimatedDiv>
        ))}
      </div>
    </div>
  );
};

export default Excel;
