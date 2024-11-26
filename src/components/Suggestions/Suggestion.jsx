import React from 'react';
import GeneralSuggestions from './GeneralSuggestions';
import PersonalizedSuggestions from './PersonalizedSuggestions';
import OfficerSuggestions from './OfficerSuggestions';

const Suggestions = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 ml-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Actionable Suggestions</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GeneralSuggestions />
        <PersonalizedSuggestions data={data} />
        <OfficerSuggestions />
      </div>
    </div>
  );
};

export default Suggestions;
