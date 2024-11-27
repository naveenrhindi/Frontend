import React from 'react';

const ResourceUsage = ({ electricityUsage, setElectricityUsage, waterUsage, setWaterUsage, emissionLevel, setEmissionLevel }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Resource Usage</h3>
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="electricityUsage">
        Electricity Usage (kWh)
      </label>
      <input
        type="number"
        id="electricityUsage"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        value={electricityUsage}
        onChange={(e) => setElectricityUsage(e.target.value)}
        placeholder="Enter electricity usage"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="waterUsage">
        Water Usage (cubic meters)
      </label>
      <input
        type="number"
        id="waterUsage"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        value={waterUsage}
        onChange={(e) => setWaterUsage(e.target.value)}
        placeholder="Enter water usage"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="emissionLevel">
        Emission Level (tons CO2)
      </label>
      <input
        type="number"
        id="emissionLevel"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        value={emissionLevel}
        onChange={(e) => setEmissionLevel(e.target.value)}
        placeholder="Enter emission level"
      />
    </div>
  </div>
);

export default ResourceUsage;
