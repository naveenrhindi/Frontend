import React, { useEffect, useState } from 'react';

const PersonalizedSuggestions = ({ data }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const analyzeData = () => {
      let newSuggestions = [];

      if (data?.carbonEmissions > 50) {
        newSuggestions.push("Consider implementing carbon capture technology to reduce emissions.");
        newSuggestions.push("Increase tree planting around the mining site to absorb CO₂.");
        newSuggestions.push("Switch to low-carbon energy sources for mining operations.");
        newSuggestions.push("Regularly monitor and maintain equipment to reduce emissions.");
      } else {
        newSuggestions.push("Carbon emissions are within acceptable limits.");
      }

      if (data?.waterUsage > 100) {
        newSuggestions.push("Optimize your water usage by fixing leaks and installing water-efficient fixtures.");
        newSuggestions.push("Use recycled water for non-potable purposes.");
        newSuggestions.push("Implement water-saving technologies such as low-flow valves.");
        newSuggestions.push("Conduct regular water audits to identify and address wastage.");
      } else {
        newSuggestions.push("Water usage is within acceptable limits.");
      }

      setSuggestions(newSuggestions);
    };

    analyzeData();
  }, [data]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg min-h-full">
      <h3 className="text-lg font-semibold text-white mb-2">Personalized Suggestions</h3>
      <ul className="list-disc pl-5 text-gray-400">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="mb-2">{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalizedSuggestions;
