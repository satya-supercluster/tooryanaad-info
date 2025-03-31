import React from "react";
import * as XLSX from "xlsx";
import AnimatedDiv from "./AnimatedDiv";

const ExcelReg = ({ data }) => {
  const verticals = [
    "प्रबंधक",
    "वेब अभिकल्पक",
    "हिन्दीतर भाषी",
    "वीडियो सम्पादक",
    "सम्पादक",
    "छायाकार",
    "अभिकल्पक",
  ];

  const generateExcel = (sheetData, fileName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sheetData);
    const headers = Object.keys(sheetData[0] || {});
    ws["!cols"] = headers.map(() => ({ wch: 20 }));
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
        year:item.year,
        contact: item.contact,
        scholar:item.scholar,
        branch:item.branch,
      };
      item.vertical.forEach((v, index) => {
        rowData[`vertical[${index}]`] = v;
      });
      return rowData;
    });

    generateExcel(allData, "all_participants_data.xlsx");
  };

   const handleDownloadVertical = (vertical) => {
     const verticalData = data
       .filter((item) => item.vertical.includes(vertical))
       .map((item) => {
         const rowData = {
           token: item.token,
           name: item.name,
           email: item.email,
           year: item.year,
           contact: item.contact,
           scholar: item.scholar,
           branch: item.branch,
         };
         item.vertical.forEach((v, index) => {
           rowData[`vertical[${index}]`] = v;
         });
         return rowData;
       });

     if (verticalData.length === 0) {
       alert(`No participants for ${vertical}`);
       return;
     }

     generateExcel(verticalData, `${vertical}_participants.xlsx`);
   };

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-orange-600">Excel files</h1>
      <AnimatedDiv>
        <button
          onClick={handleDownloadAll}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Download All Data
        </button>
      </AnimatedDiv>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {verticals.map((vertical) => (
          <AnimatedDiv key={vertical}>
            <button
              onClick={() => handleDownloadVertical(vertical)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              {vertical}
            </button>
          </AnimatedDiv>
        ))}
      </div>
    </div>
  );
};

export default ExcelReg;
