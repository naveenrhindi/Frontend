import React from 'react';
import SelectGroup from './SelectGroup';

const FuelInformation = ({ fuelType, setFuelType, fuelConsumption, setFuelConsumption }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-white mb-2">Fuel Information</h3>
    <SelectGroup
      label="Fuel Type"
      options={['Diesel', 'Petrol', 'Natural Gas', 'Other']}
      onChange={setFuelType}
    />
    <div className="mb-4">
      <label className="block text-gray-400 mb-2" htmlFor="fuelConsumption">Fuel Consumption (liters)</label>
      <input
        type="number"
        id="fuelConsumption"
        className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
        value={fuelConsumption}
        onChange={(e) => setFuelConsumption(e.target.value)}
        placeholder="Enter fuel consumption"
      />
    </div>
  </div>
);

export default FuelInformation;
