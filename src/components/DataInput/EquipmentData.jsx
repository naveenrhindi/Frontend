import React from 'react';
import SelectGroup from './SelectGroup';

const ResourceUsage = ({ electricityUsage, setElectricityUsage, waterUsage, setWaterUsage, emissionLevel, setEmissionLevel }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Equipment Usage</h3>

    <SelectGroup
      label="Equipment Type Used"
      options={[
        'Continuous Mining Machines',
        'Roof Bolters',
        'Shuttle Cars',
        'Longwall Systems',
        'Ventilation Systems',
        'Water Pumps',
        'Conveyor Systems'
      ]}
      onChange={() => {}}
    />

    <SelectGroup
      label="Equipment Fuel Type"
      options={['Diesel', 'Electric', 'Hybrid', 'Pneumatic']}
      onChange={() => {}}
    />

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="electricityUsage">
        Operating Hours per Day
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
        placeholder="Enter operating hours"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="waterUsage">
        Average Fuel Consumption per Hour (liters/kWh)
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
        placeholder="Enter average fuel consumption"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="emissionLevel">
        Equipment Efficiency Rating (%)
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
        placeholder="Enter equipment efficiency"
        min="0"
        max="100"
      />
    </div>
  </div>
);

export default ResourceUsage;
