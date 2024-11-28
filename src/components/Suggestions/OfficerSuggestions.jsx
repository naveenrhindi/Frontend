import React, { useState, useCallback } from 'react';
import ProgressModal from './ProgressModal/ProgressModal';
import useSuggestionStore from '../../store/suggestionStore';

const OfficerSuggestions = ({ filters }) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const getSuggestion = useSuggestionStore(state => state.getSuggestion);

  const handleSuggestionClick = useCallback((suggestion) => {
    setSelectedSuggestion(suggestion);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSuggestion(null);
  }, []);

  const suggestions = [
    {
      id: 1,
      title: "Site Inspection",
      description: "Regularly inspect mining sites for environmental compliance.",
      icon: "https://img.icons8.com/fluency/48/survey.png",
      frequency: "Weekly",
      status: "pending",
      category: "Environmental",
      priority: "High"
    },
    {
      id: 2,
      title: "Training Sessions",
      description: "Conduct training sessions on environmental policies and practices.",
      icon: "https://img.icons8.com/color/48/commercial-development-management.png",
      frequency: "Monthly",
      status: "pending",
      category: "Training",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Environmental Management",
      description: "Develop and implement an environmental management system (EMS).",
      icon: "https://img.icons8.com/color/48/environment-care.png",
      frequency: "Quarterly",
      status: "in-progress",
      category: "Management",
      priority: "High"
    },
    {
      id: 4,
      title: "Incident Reporting",
      description: "Establish a reporting system for environmental incidents and improvements.",
      icon: "https://img.icons8.com/color/48/report-card.png",
      frequency: "Daily",
      status: "completed",
      category: "Reporting",
      priority: "High"
    },
    {
      id: 5,
      title: "Agency Collaboration",
      description: "Collaborate with environmental agencies for audits and assessments.",
      icon: "https://img.icons8.com/color/48/collaboration.png",
      frequency: "Quarterly",
      status: "pending",
      category: "Collaboration",
      priority: "Medium"
    }
  ];

  const getFrequencyColor = (frequency) => {
    switch (frequency.toLowerCase()) {
      case 'daily':
        return 'bg-blue-100 text-blue-800';
      case 'weekly':
        return 'bg-green-100 text-green-800';
      case 'monthly':
        return 'bg-purple-100 text-purple-800';
      case 'quarterly':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredSuggestions = suggestions.filter(suggestion => {
    if (!filters) return true;
    const categoryMatch = !filters.category || filters.category === 'all' || suggestion.category === filters.category;
    const priorityMatch = !filters.priority || filters.priority === 'all' || suggestion.priority === filters.priority;
    return categoryMatch && priorityMatch;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuggestions.map((suggestion) => {
          const savedData = getSuggestion(suggestion.id);
          const progress = savedData?.progress || 0;
          const status = savedData?.status || suggestion.status;

          return (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
            >
              {/* Priority Indicator */}
              <div className={`absolute top-0 right-0 w-16 h-16 ${getPriorityColor(suggestion.priority)}`}>
                <div className="absolute transform rotate-45 bg-current text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center">
                  {suggestion.priority} Priority
                </div>
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <img src={suggestion.icon} alt="" className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-black">
                      {suggestion.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFrequencyColor(suggestion.frequency)}`}>
                        {suggestion.frequency}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {status}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {suggestion.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                  {suggestion.description}
                </p>

                {/* Progress Section */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: status === 'completed' ? '#10B981' : 
                                      status === 'in-progress' ? '#3B82F6' : 
                                      '#FCD34D'
                      }}
                    />
                  </div>
                </div>

                {/* Last Updated */}
                {savedData?.lastUpdated && (
                  <div className="mt-4 text-xs text-gray-500">
                    Last updated: {new Date(savedData.lastUpdated).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedSuggestion && (
        <ProgressModal
          suggestion={selectedSuggestion}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default OfficerSuggestions;
