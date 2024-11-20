import React from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import Papa from 'papaparse';
import { FaFileCsv, FaFilePdf } from 'react-icons/fa';

function ExportOptions({ inputData, suggestions }) {
  const exportToCSV = (data, filename) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  const exportToPDF = (data, filename) => {
    const doc = new jsPDF();
    doc.text("Exported Data", 10, 10);
    data.forEach((item, index) => {
      doc.text(`${item.parameter}: ${item.value}`, 10, 20 + index * 10);
    });
    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 text-center rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Export Options</h3>
      <div className="flex justify-between space-x-4">
        <div className="flex-1 h-40">
          <button
            onClick={() => exportToCSV(inputData, "InputData")}
            className="w-full h-full flex flex-col items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 p-4"
          >
            <FaFileCsv className="mb-2 text-4xl" />
            <span className="text-lg">Export Input Data (CSV)</span>
          </button>
        </div>
        <div className="flex-1 h-40">
          <button
            onClick={() => exportToPDF(suggestions, "Suggestions")}
            className="w-full h-full flex flex-col items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 p-4"
          >
            <FaFilePdf className="mb-2 text-4xl" />
            <span className="text-lg">Export Suggestions (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportOptions;
