import React, { useEffect, useState } from 'react';

const PersonalizedSuggestions = ({ data, filters }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const analyzeData = () => {
      let newSuggestions = [];

      if (data?.carbonEmissions > 50) {
        newSuggestions.push({
          category: 'Carbon Emissions',
          icon: '🏭',
          suggestions: [
            {
              title: "Carbon Capture Technology",
              description: "Consider implementing carbon capture technology to reduce emissions.",
              impact: "High",
              timeframe: "Long-term",
              priority: "High",
              category: "Carbon Emissions"
            },
            {
              title: "Tree Planting Initiative",
              description: "Increase tree planting around the mining site to absorb CO₂.",
              impact: "Medium",
              timeframe: "Medium-term",
              priority: "Medium",
              category: "Carbon Emissions"
            },
            {
              title: "Energy Source Transition",
              description: "Switch to low-carbon energy sources for mining operations.",
              impact: "High",
              timeframe: "Long-term",
              priority: "High",
              category: "Carbon Emissions"
            },
            {
              title: "Equipment Maintenance",
              description: "Regularly monitor and maintain equipment to reduce emissions.",
              impact: "Medium",
              timeframe: "Short-term",
              priority: "Medium",
              category: "Carbon Emissions"
            }
          ]
        });
      }

      if (data?.waterUsage > 100) {
        newSuggestions.push({
          category: 'Water Usage',
          icon: '💧',
          suggestions: [
            {
              title: "Leak Prevention",
              description: "Optimize your water usage by fixing leaks and installing water-efficient fixtures.",
              impact: "High",
              timeframe: "Short-term",
              priority: "High",
              category: "Water Usage"
            },
            {
              title: "Water Recycling",
              description: "Use recycled water for non-potable purposes.",
              impact: "High",
              timeframe: "Medium-term",
              priority: "High",
              category: "Water Usage"
            },
            {
              title: "Water-Saving Technology",
              description: "Implement water-saving technologies such as low-flow valves.",
              impact: "Medium",
              timeframe: "Medium-term",
              priority: "Medium",
              category: "Water Usage"
            },
            {
              title: "Regular Audits",
              description: "Conduct regular water audits to identify and address wastage.",
              impact: "Medium",
              timeframe: "Short-term",
              priority: "Medium",
              category: "Water Usage"
            }
          ]
        });
      }

      setSuggestions(newSuggestions);
    };

    analyzeData();
  }, [data]);

  const getTimeframeColor = (timeframe) => {
    switch (timeframe) {
      case 'Short-term':
        return 'bg-green-100 text-green-800';
      case 'Medium-term':
        return 'bg-yellow-100 text-yellow-800';
      case 'Long-term':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'bg-purple-100 text-purple-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSuggestions = suggestions.map(category => ({
    ...category,
    suggestions: category.suggestions.filter(suggestion => {
      const categoryMatch = filters.category === 'all' || suggestion.category === filters.category;
      const priorityMatch = filters.priority === 'all' || suggestion.priority === filters.priority;
      const timeframeMatch = filters.timeframe === 'all' || suggestion.timeframe === filters.timeframe;
      return categoryMatch && priorityMatch && timeframeMatch;
    })
  })).filter(category => category.suggestions.length > 0);

  return (
    <div className="space-y-8">
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
        filteredSuggestions.map((category, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-xl font-semibold text-black">{category.category}</h3>
            </div>
            
            <div className="grid gap-4">
              {category.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-black shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-black mb-2">{suggestion.title}</h4>
                  <p className="text-gray-600 mb-3">{suggestion.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                      {suggestion.impact} Impact
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTimeframeColor(suggestion.timeframe)}`}>
                      {suggestion.timeframe}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PersonalizedSuggestions;
