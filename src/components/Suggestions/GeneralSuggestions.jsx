import React from 'react';

const GeneralSuggestions = ({ filters }) => {
  const suggestions = [
    {
      title: "Install Solar Panels",
      description: "Install rooftop solar panels to reduce grid electricity consumption.",
      icon: "https://img.icons8.com/color/48/solar-panel.png",
      priority: "High",
      category: "Energy Efficiency",
      timeframe: "Medium-term",
      status: "pending"
    },
    {
      title: "Water Recycling System",
      description: "Implement water recycling system for industrial processes.",
      icon: "https://img.icons8.com/color/48/water.png",
      priority: "Medium",
      category: "Water Usage",
      timeframe: "Short-term",
      status: "in-progress"
    },
    {
      title: "Smart Waste Management",
      description: "Deploy smart bins and waste segregation system.",
      icon: "https://img.icons8.com/color/48/waste.png",
      priority: "Low",
      category: "Waste Management",
      timeframe: "Short-term",
      status: "completed"
    },
    {
      title: "Carbon Capture System",
      description: "Install carbon capture technology in manufacturing units.",
      icon: "https://img.icons8.com/color/48/co2.png",
      priority: "High",
      category: "Carbon Emissions",
      timeframe: "Long-term",
      status: "pending"
    },
    {
      title: "LED Lighting Upgrade",
      description: "Replace all traditional lighting with LED systems.",
      icon: "https://img.icons8.com/color/48/light.png",
      priority: "Low",
      category: "Energy Efficiency",
      timeframe: "Short-term",
      status: "completed"
    },
    {
      title: "Rainwater Harvesting",
      description: "Install rainwater harvesting systems across facilities.",
      icon: "https://img.icons8.com/color/48/rain.png",
      priority: "Medium",
      category: "Water Usage",
      timeframe: "Medium-term",
      status: "in-progress"
    },
    {
      title: "Composting Program",
      description: "Start organic waste composting program.",
      icon: "https://img.icons8.com/color/48/compost.png",
      priority: "Low",
      category: "Waste Management",
      timeframe: "Short-term",
      status: "pending"
    },
    {
      title: "Electric Vehicle Fleet",
      description: "Transition company vehicles to electric alternatives.",
      icon: "https://img.icons8.com/color/48/electric-car.png",
      priority: "High",
      category: "Carbon Emissions",
      timeframe: "Long-term",
      status: "in-progress"
    },
    {
      title: "Employee Training",
      description: "Enhance employee training programs for sustainability practices.",
      icon: "https://img.icons8.com/color/48/training.png",
      priority: "Medium",
      category: "Environmental",
      timeframe: "Medium-term",
      status: "pending"
    },
    {
      title: "Community Engagement",
      description: "Engage with local communities to improve environmental efforts.",
      icon: "https://img.icons8.com/color/48/conference-call--v1.png",
      priority: "Low",
      category: "Environmental",
      timeframe: "Long-term",
      status: "in-progress"
    },
    {
      title: "Environmental Certification",
      description: "Consider obtaining environmental certifications to demonstrate commitment.",
      icon: "https://img.icons8.com/color/48/certificate.png",
      priority: "Medium",
      category: "Environmental",
      timeframe: "Medium-term",
      status: "pending"
    },
    {
      title: "Partnerships",
      description: "Explore partnerships with environmental organizations for better practices.",
      icon: "https://img.icons8.com/color/48/handshake.png",
      priority: "High",
      category: "Environmental",
      timeframe: "Long-term",
      status: "in-progress"
    },
    {
      title: "Regulatory Compliance",
      description: "Stay updated with new regulations and compliance requirements.",
      icon: "https://img.icons8.com/color/48/law.png",
      priority: "High",
      category: "Environmental",
      timeframe: "Short-term",
      status: "completed"
    }
  ];

  const filteredSuggestions = suggestions.filter(suggestion => {
    const categoryMatch = filters.category === 'all' || suggestion.category === filters.category;
    const statusMatch = filters.status === 'all' || suggestion.status === filters.status;
    const priorityMatch = filters.priority === 'all' || suggestion.priority === filters.priority;
    const timeframeMatch = filters.timeframe === 'all' || suggestion.timeframe === filters.timeframe;
    return categoryMatch && statusMatch && priorityMatch && timeframeMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      default:
        return '⏳';
    }
  };

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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)}`}>
                      {getStatusIcon(suggestion.status)} {suggestion.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      suggestion.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : suggestion.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {suggestion.priority} Priority
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{suggestion.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
                    {suggestion.category}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs">
                    {suggestion.timeframe}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GeneralSuggestions;
