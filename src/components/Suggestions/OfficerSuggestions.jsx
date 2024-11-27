import React from 'react';

const OfficerSuggestions = ({ filters }) => {
  const suggestions = [
    {
      title: "Site Inspection",
      description: "Regularly inspect mining sites for environmental compliance.",
      icon: "https://img.icons8.com/fluency/48/survey.png",
      frequency: "Weekly",
      status: "Ongoing",
      category: "Environmental",
      priority: "High"
    },
    {
      title: "Training Sessions",
      description: "Conduct training sessions on environmental policies and practices.",
      icon: "https://img.icons8.com/color/48/commercial-development-management.png",
      frequency: "Monthly",
      status: "Scheduled",
      category: "Environmental",
      priority: "Medium"
    },
    {
      title: "Environmental Management",
      description: "Develop and implement an environmental management system (EMS).",
      icon: "https://img.icons8.com/color/48/environment-care.png",
      frequency: "Quarterly",
      status: "In Progress",
      category: "Environmental",
      priority: "High"
    },
    {
      title: "Incident Reporting",
      description: "Establish a reporting system for environmental incidents and improvements.",
      icon: "https://img.icons8.com/color/48/report-card.png",
      frequency: "Daily",
      status: "Completed",
      category: "Environmental",
      priority: "High"
    },
    {
      title: "Agency Collaboration",
      description: "Collaborate with environmental agencies for audits and assessments.",
      icon: "https://img.icons8.com/color/48/collaboration.png",
      frequency: "Quarterly",
      status: "Planned",
      category: "Environmental",
      priority: "Medium"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ongoing':
        return 'bg-purple-100 text-purple-800';
      case 'Scheduled':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'Daily':
        return 'bg-red-100 text-red-800';
      case 'Weekly':
        return 'bg-orange-100 text-orange-800';
      case 'Monthly':
        return 'bg-green-100 text-green-800';
      case 'Quarterly':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-black">{suggestion.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(suggestion.frequency)}`}>
                      {suggestion.frequency}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)}`}>
                      {suggestion.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{suggestion.description}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OfficerSuggestions;
