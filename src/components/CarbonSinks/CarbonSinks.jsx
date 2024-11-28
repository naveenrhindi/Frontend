import React, { useState } from 'react';
import CarbonSinksInput from './CarbonSinksInput';
import CarbonSinksVisualisation from './CarbonSinksVisualisation';
import { motion } from 'framer-motion';
import { FaTree, FaLeaf, FaMountain } from 'react-icons/fa';

const CarbonSinks = () => {
  const [activeTab, setActiveTab] = useState('afforestation');
  const [data, setData] = useState({
    afforestation: {
      area: 0,
      plantingRate: 0,
      treeType: 'broadleaf'
    },
    soilCarbon: {
      area: 0,
      managementType: 'organic'
    },
    grassland: {
      area: 0,
      grassType: 'native'
    }
  });

  const handleDataUpdate = (newData) => {
    setData(newData);
  };

  const calculateTotalSequestration = () => {
    const afforestationSeq = data.afforestation.area * data.afforestation.plantingRate * 0.05;
    const soilSeq = data.soilCarbon.area * (data.soilCarbon.managementType === 'organic' ? 3 : 2);
    const grasslandSeq = data.grassland.area * (data.grassland.grassType === 'native' ? 4 : 3);
    return (afforestationSeq + soilSeq + grasslandSeq).toFixed(2);
  };

  const calculateTotalArea = () => {
    return (data.afforestation.area + data.soilCarbon.area + data.grassland.area).toFixed(2);
  };

  const tabs = [
    { id: 'afforestation', label: 'Afforestation', icon: FaTree },
    { id: 'soilCarbon', label: 'Soil Carbon', icon: FaLeaf },
    { id: 'grassland', label: 'Grassland', icon: FaMountain }
  ];

  return (
    <div className="mx-auto p-4 md:p-6 2xl:p-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Carbon Sinks Management</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
              <FaTree className="fill-[#22c55e] text-xl" />
            </div>
            <div className="ml-4">
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {calculateTotalSequestration()} tCO2e
              </h4>
              <span className="text-sm font-medium">Total Sequestration</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
              <FaLeaf className="fill-[#22c55e] text-xl" />
            </div>
            <div className="ml-4">
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {calculateTotalArea()} ha
              </h4>
              <span className="text-sm font-medium">Total Area</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-stroke">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-[#22c55e] text-[#22c55e]'
                  : 'border-transparent text-body-color hover:text-[#22c55e]'
              }`}
            >
              <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? 'text-[#22c55e]' : ''}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <CarbonSinksInput
            activeTab={activeTab}
            data={data}
            onUpdate={handleDataUpdate}
          />
        </div>

        {/* Visualization */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <CarbonSinksVisualisation data={data} />
        </div>
      </div>
    </div>
  );
};

export default CarbonSinks;
