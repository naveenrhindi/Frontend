import React from 'react';

const OfficerSuggestions = () => {
  const suggestions = [
    "Regularly inspect mining sites for environmental compliance.",
    "Conduct training sessions on environmental policies and practices.",
    "Develop and implement an environmental management system (EMS).",
    "Establish a reporting system for environmental incidents and improvements.",
    "Collaborate with environmental agencies for audits and assessments.",
    
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg min-h-full">
      <h3 className="text-lg font-semibold text-white mb-2">Environmental Officer Suggestions</h3>
      <ul className="list-disc pl-5 text-gray-400">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="mb-2">{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default OfficerSuggestions;
