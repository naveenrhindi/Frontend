import React, { useState, useCallback, useMemo } from 'react';
import useSuggestionStore from '../../store/suggestionStore';
import ProgressModal from './ProgressModal/ProgressModal';

const PersonalizedSuggestions = ({ filters }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
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
      id: 'p1',
      title: "Smart Metering System",
      description: "Install smart meters to monitor and optimize energy consumption in your facility.",
      icon: "/icons/smart-meter.svg",
      category: "Technology",
      relevance: "High",
      roi: "Medium",
      complexity: "Medium",
      estimatedSavings: "₹50,000/month",
      siteInspection: {
        lastInspection: "2024-01-15",
        nextInspection: "2024-02-15",
        status: "Scheduled",
        findings: "Initial assessment complete"
      },
      progress: {
        percentage: 35,
        status: "in-progress",
        milestones: [
          { title: "Site Survey", completed: true },
          { title: "Equipment Order", completed: true },
          { title: "Installation", completed: false },
          { title: "Testing", completed: false }
        ]
      },
      impactMetrics: {
        energySaved: "2500 kWh/month",
        carbonReduced: "1.2 tons CO2/month",
        waterConserved: "N/A",
        implementationCost: "₹300,000"
      }
    },
    {
      id: 'p2',
      title: "Process Optimization",
      description: "Optimize mining processes using data analytics and AI for better resource utilization.",
      icon: "/icons/process-optimization.svg",
      category: "Operations",
      relevance: "High",
      roi: "High",
      complexity: "High",
      estimatedSavings: "₹200,000/month",
      siteInspection: {
        lastInspection: "2024-01-10",
        nextInspection: "2024-02-10",
        status: "In Review",
        findings: "Process bottlenecks identified"
      },
      progress: {
        percentage: 60,
        status: "in-progress",
        milestones: [
          { title: "Data Collection", completed: true },
          { title: "Analysis", completed: true },
          { title: "Implementation", completed: false },
          { title: "Monitoring", completed: false }
        ]
      },
      impactMetrics: {
        energySaved: "5000 kWh/month",
        carbonReduced: "2.4 tons CO2/month",
        waterConserved: "1000 L/month",
        implementationCost: "₹1,200,000"
      }
    },
    {
      id: 'p3',
      title: "Employee Training Program",
      description: "Implement comprehensive sustainability training for all employees.",
      icon: "/icons/training.svg",
      category: "Training",
      relevance: "Medium",
      roi: "Medium",
      complexity: "Low",
      estimatedSavings: "₹30,000/month",
      siteInspection: {
        lastInspection: "2024-01-12",
        nextInspection: "2024-02-12",
        status: "Scheduled",
        findings: "Training materials prepared"
      },
      progress: {
        percentage: 20,
        status: "in-progress",
        milestones: [
          { title: "Training Plan", completed: true },
          { title: "Training Delivery", completed: false },
          { title: "Evaluation", completed: false }
        ]
      },
      impactMetrics: {
        energySaved: "N/A",
        carbonReduced: "N/A",
        waterConserved: "N/A",
        implementationCost: "₹50,000"
      }
    },
    {
      id: 'p4',
      title: "Waste Heat Recovery",
      description: "Install waste heat recovery systems in processing units.",
      icon: "/icons/waste-heat-recovery.svg",
      category: "Energy",
      relevance: "High",
      roi: "High",
      complexity: "High",
      estimatedSavings: "₹150,000/month",
      siteInspection: {
        lastInspection: "2024-01-18",
        nextInspection: "2024-02-18",
        status: "In Review",
        findings: "System design complete"
      },
      progress: {
        percentage: 40,
        status: "in-progress",
        milestones: [
          { title: "System Design", completed: true },
          { title: "Installation", completed: false },
          { title: "Testing", completed: false }
        ]
      },
      impactMetrics: {
        energySaved: "3000 kWh/month",
        carbonReduced: "1.8 tons CO2/month",
        waterConserved: "N/A",
        implementationCost: "₹600,000"
      }
    },
    {
      id: 'p5',
      title: "Local Sourcing Initiative",
      description: "Develop partnerships with local suppliers to reduce transportation emissions.",
      icon: "/icons/local-sourcing.svg",
      category: "Supply Chain",
      relevance: "Medium",
      roi: "Medium",
      complexity: "Medium",
      estimatedSavings: "₹80,000/month",
      siteInspection: {
        lastInspection: "2024-01-20",
        nextInspection: "2024-02-20",
        status: "Scheduled",
        findings: "Supplier engagement initiated"
      },
      progress: {
        percentage: 30,
        status: "in-progress",
        milestones: [
          { title: "Supplier Engagement", completed: true },
          { title: "Contract Negotiation", completed: false },
          { title: "Implementation", completed: false }
        ]
      },
      impactMetrics: {
        energySaved: "N/A",
        carbonReduced: "0.6 tons CO2/month",
        waterConserved: "N/A",
        implementationCost: "₹100,000"
      }
    }
  ];

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return 'bg-purple-100 text-purple-800';
      case 'operations':
        return 'bg-blue-100 text-blue-800';
      case 'training':
        return 'bg-green-100 text-green-800';
      case 'energy':
        return 'bg-yellow-100 text-yellow-800';
      case 'supply chain':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelevanceColor = (relevance) => {
    switch (relevance.toLowerCase()) {
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

  const getRoiColor = (roi) => {
    switch (roi.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedAndFilteredSuggestions = useMemo(() => {
    let filtered = suggestions.filter(suggestion => {
      if (!filters) return true;
      const categoryMatch = !filters.category || filters.category === 'all' || suggestion.category === filters.category;
      return categoryMatch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          const relevanceOrder = { high: 3, medium: 2, low: 1 };
          return relevanceOrder[b.relevance.toLowerCase()] - relevanceOrder[a.relevance.toLowerCase()];
        case 'roi':
          const roiOrder = { high: 3, medium: 2, low: 1 };
          return roiOrder[b.roi.toLowerCase()] - roiOrder[a.roi.toLowerCase()];
        case 'complexity':
          const complexityOrder = { low: 3, medium: 2, high: 1 };
          return complexityOrder[a.complexity.toLowerCase()] - complexityOrder[b.complexity.toLowerCase()];
        case 'savings':
          const getSavings = str => parseInt(str.replace(/[^0-9]/g, ''));
          return getSavings(b.estimatedSavings) - getSavings(a.estimatedSavings);
        default:
          return 0;
      }
    });
  }, [filters, sortBy]);

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedAndFilteredSuggestions.map((suggestion) => {
        const savedData = getSuggestion(suggestion.id);
        const progress = savedData?.status === 'pending' ? 0 : 
                        savedData?.status === 'completed' ? 100 : 
                        savedData?.progress || suggestion.progress?.percentage || 0;
        const status = savedData?.status || suggestion.progress?.status || 'pending';

        const getProgressColor = (status) => {
          switch (status) {
            case 'completed':
              return 'bg-green-500';
            case 'in-progress':
              return 'bg-blue-500';
            case 'pending':
              return 'bg-yellow-500';
            default:
              return 'bg-gray-200';
          }
        };

        return (
          <div
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
          >
            {/* Priority Indicator */}
            <div className={`absolute top-0 right-0 w-16 h-16 ${getRelevanceColor(suggestion.relevance)}`}>
              <div className="absolute transform rotate-45 bg-current text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center">
                {suggestion.relevance} Relevance
              </div>
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <img src={suggestion.icon} alt="" className="w-8 h-8" onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/icons/default-suggestion.svg';
                  }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-black">
                    {suggestion.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(suggestion.category)}`}>
                      {suggestion.category}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoiColor(suggestion.roi)}`}>
                      ROI: {suggestion.roi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                {suggestion.description}
              </p>

              {/* Progress Preview */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Implementation Progress</span>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      status === 'completed' ? 'bg-green-100 text-green-800' :
                      status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{progress}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${getProgressColor(status)}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Estimated Savings */}
              <div className="mt-4 text-right">
                <span className="text-sm font-medium text-green-600">
                  Est. Savings: {suggestion.estimatedSavings}
                </span>
              </div>

              {/* Last Updated */}
              {savedData?.lastUpdated && (
                <div className="mt-2 text-xs text-gray-500 text-right">
                  Updated: {new Date(savedData.lastUpdated).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {sortedAndFilteredSuggestions.map((suggestion) => {
        const savedData = getSuggestion(suggestion.id);
        const progress = savedData?.status === 'pending' ? 0 : 
                        savedData?.status === 'completed' ? 100 : 
                        savedData?.progress || suggestion.progress?.percentage || 0;
        const status = savedData?.status || suggestion.progress?.status || 'pending';

        return (
          <div
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
          >
            <div className="p-4 flex items-center space-x-4">
              {/* Icon and Title */}
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <img src={suggestion.icon} alt="" className="w-6 h-6" onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/icons/default-suggestion.svg';
                }} />
              </div>
              
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-black">
                    {suggestion.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(suggestion.relevance)} bg-opacity-10`}>
                      {suggestion.relevance}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      status === 'completed' ? 'bg-green-100 text-green-800' :
                      status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          status === 'completed' ? 'bg-green-500' :
                          status === 'in-progress' ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Controls */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'grid' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border-gray-200 rounded-lg focus:ring-black focus:border-black"
          >
            <option value="relevance">Relevance</option>
            <option value="roi">ROI</option>
            <option value="savings">Savings</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? renderGridView() : renderListView()}

      {/* Progress Modal */}
      {selectedSuggestion && (
        <ProgressModal
          suggestion={selectedSuggestion}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PersonalizedSuggestions;
