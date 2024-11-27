import React from 'react';
import SelectGroup from './SelectGroup';

const FuelInformation = ({ fuelType, setFuelType, fuelConsumption, setFuelConsumption }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Fuel Information</h3>
    <SelectGroup
      label="Fuel Type"
      options={['Diesel', 'Petrol', 'Natural Gas', 'Other']}
      onChange={setFuelType}
    />
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="fuelConsumption">
        Fuel Consumption (liters)
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
        placeholder="Enter fuel consumption"
      />
    </div>
  </div>
);

export default FuelInformation;
