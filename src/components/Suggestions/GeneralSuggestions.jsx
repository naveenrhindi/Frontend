import React from 'react';

const GeneralSuggestions = ({ filters }) => {
  const suggestions = [
    {
      title: "Employee Training",
      description: "Enhance employee training programs for sustainability practices.",
      icon: "https://img.icons8.com/color/48/training.png",
      priority: "High",
      category: "Environmental"
    },
    {
      title: "Community Engagement",
      description: "Engage with local communities to improve environmental efforts.",
      icon: "https://img.icons8.com/color/48/conference-call--v1.png",
      priority: "Medium",
      category: "Environmental"
    },
    {
      title: "Environmental Certification",
      description: "Consider obtaining environmental certifications to demonstrate commitment.",
      icon: "https://img.icons8.com/color/48/certificate.png",
      priority: "High",
      category: "Environmental"
    },
    {
      title: "Partnerships",
      description: "Explore partnerships with environmental organizations for better practices.",
      icon: "https://img.icons8.com/color/48/handshake.png",
      priority: "Medium",
      category: "Environmental"
    },
    {
      title: "Regulatory Compliance",
      description: "Stay updated with new regulations and compliance requirements.",
      icon: "https://img.icons8.com/color/48/law.png",
      priority: "High",
      category: "Environmental"
    }
  ];

  const filteredSuggestions = suggestions.filter(suggestion => {
    const categoryMatch = filters.category === 'all' || suggestion.category === filters.category;
    const priorityMatch = filters.priority === 'all' || suggestion.priority === filters.priority;
    return categoryMatch && priorityMatch;
  });

  return (
    <div className="space-y-4">
      {filteredSuggestions.length === 0 ? (
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-600">No suggestions match your current filters</p>
        </div>
      ) : (
        filteredSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-black shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={suggestion.icon} alt={suggestion.title} className="w-8 h-8"/>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-black">{suggestion.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    suggestion.priority === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {suggestion.priority} Priority
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{suggestion.description}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GeneralSuggestions;
