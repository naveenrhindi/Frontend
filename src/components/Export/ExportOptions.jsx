import React from "react";
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { saveAs } from "file-saver";

const ExportOptions = ({ inputData, suggestions }) => {
  const exportToCSV = (data, filename) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Coal Mine Report", 10, 10);

    // Adding Input Data
    pdf.setFontSize(16);
    pdf.text("Input Data:", 10, 20);
    pdf.setFontSize(12);
    inputData.forEach((item, index) => {
      pdf.text(`${item.parameter}: ${item.value}`, 10, 30 + index * 10);
    });

    // Adding Suggestions
    pdf.setFontSize(16);
    const suggestionsStartY = 30 + inputData.length * 10 + 10;
    pdf.text("Suggestions:", 10, suggestionsStartY);
    pdf.setFontSize(12);
    suggestions.forEach((item, index) => {
      pdf.text(`${item.parameter}: ${item.value}`, 10, suggestionsStartY + 10 + index * 10);
    });

    // Saving the PDF
    pdf.save("coal_mine_report.pdf");
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
            onClick={exportToPDF}
            className="w-full h-full flex flex-col items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 p-4"
          >
            <FaFilePdf className="mb-2 text-4xl" />
            <span className="text-lg">Export to PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
