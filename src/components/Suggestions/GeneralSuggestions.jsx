import React from 'react';

const GeneralSuggestions = () => {
  const suggestions = [
    "Enhance employee training programs for sustainability practices.",
    "Engage with local communities to improve environmental efforts.",
    "Consider obtaining environmental certifications to demonstrate commitment.",
    "Explore partnerships with environmental organizations for better practices.",
    "Stay updated with new regulations and compliance requirements."
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg min-h-full">
      <h3 className="text-lg font-semibold text-white mb-2">General Suggestions</h3>
      <ul className="list-disc pl-5 text-gray-400">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="mb-2">{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default GeneralSuggestions;
