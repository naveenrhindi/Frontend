import React from 'react';
import SelectGroup from './SelectGroup';

const FuelInformation = ({ fuelType, setFuelType, fuelConsumption, setFuelConsumption }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Excavation Data</h3>
    
    <SelectGroup
      label="Type of Excavation Method"
      options={['Surface Mining', 'Underground Mining', 'Longwall Mining', 'Room and Pillar Mining']}
      onChange={setFuelType}
    />

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="fuelConsumption">
        Amount of Coal Excavated (tons)
      </label>
      <input
        type="number"
        id="fuelConsumption"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        value={fuelConsumption}
        onChange={(e) => setFuelConsumption(e.target.value)}
        placeholder="Enter amount of coal excavated"
      />
    </div>

    <SelectGroup
      label="Excavation Equipment Used"
      options={['Continuous Miners', 'Draglines', 'Power Shovels', 'Hydraulic Excavators', 'Longwall Shearers']}
      onChange={() => {}}
    />

    <SelectGroup
      label="Excavation Fuel Type"
      options={['Diesel', 'Electric', 'Hybrid']}
      onChange={() => {}}
    />
  </div>
);

export default FuelInformation;
