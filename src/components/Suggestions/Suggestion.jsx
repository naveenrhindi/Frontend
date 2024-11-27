import React, { useState } from 'react';
import GeneralSuggestions from './GeneralSuggestions';
import PersonalizedSuggestions from './PersonalizedSuggestions';
import OfficerSuggestions from './OfficerSuggestions';

const Suggestions = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('general');
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    timeframe: 'all'
  });

  const filterOptions = {
    category: ['all', 'Carbon Emissions', 'Water Usage', 'Energy Efficiency', 'Waste Management'],
    priority: ['all', 'High', 'Medium', 'Low'],
    timeframe: ['all', 'Short-term', 'Medium-term', 'Long-term']
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const tabs = [
    { id: 'general', label: 'General Suggestions', icon: '🌍' },
    { id: 'personalized', label: 'Personalized Suggestions', icon: '📊' },
    { id: 'officer', label: 'Officer Suggestions', icon: '👨‍💼' }
  ];

  return (
    <div className="p-6 rounded-lg shadow-md mt-8 ml-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Emission Reduction Pathways</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-black shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Emission Level</p>
              <p className="text-2xl font-bold text-black">75%</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📈</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-black shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Target Reduction</p>
              <p className="text-2xl font-bold text-black">25%</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-black shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Implementation Progress</p>
              <p className="text-2xl font-bold text-black">60%</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-black mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {filterOptions.category.map(option => (
                <option key={option} value={option}>{option === 'all' ? 'All Categories' : option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              {filterOptions.priority.map(option => (
                <option key={option} value={option}>{option === 'all' ? 'All Priorities' : option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={filters.timeframe}
              onChange={(e) => handleFilterChange('timeframe', e.target.value)}
            >
              {filterOptions.timeframe.map(option => (
                <option key={option} value={option}>{option === 'all' ? 'All Timeframes' : option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedTab === tab.id
                ? 'bg-black text-white shadow-lg transform scale-105'
                : 'bg-white text-black border border-black hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg border border-black shadow-lg">
        {selectedTab === 'general' && <GeneralSuggestions filters={filters} />}
        {selectedTab === 'personalized' && <PersonalizedSuggestions data={data} filters={filters} />}
        {selectedTab === 'officer' && <OfficerSuggestions filters={filters} />}
      </div>
    </div>
  );
};

export default Suggestions;
