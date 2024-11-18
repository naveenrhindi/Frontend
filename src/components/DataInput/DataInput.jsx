import React, { useState } from 'react';
import FuelInformation from './FuelInformation';
import ProductionData from './ProductionData';
import ResourceUsage from './ResourceUsage';

const DataInput = () => {
  const [fuelType, setFuelType] = useState('');
  const [fuelConsumption, setFuelConsumption] = useState('');
  const [coalProduction, setCoalProduction] = useState('');
  const [electricityUsage, setElectricityUsage] = useState('');
  const [waterUsage, setWaterUsage] = useState('');
  const [emissionLevel, setEmissionLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = {
      fuelType,
      fuelConsumption,
      coalProduction,
      electricityUsage,
      waterUsage,
      emissionLevel,
    };
    console.log('Submitted Data:', inputData);
    // Reset the form after submission
    setFuelType('');
    setFuelConsumption('');
    setCoalProduction('');
    setElectricityUsage('');
    setWaterUsage('');
    setEmissionLevel('');
  };

  return (
    <div className="bg-transparent p-6 rounded-lg shadow-md mt-8 ml-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Data Input</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - two horizontal sections */}
          <div className="grid grid-rows-2 gap-4">
            {/* Horizontal Section 1 */}
            <FuelInformation 
              fuelType={fuelType}
              setFuelType={setFuelType}
              fuelConsumption={fuelConsumption}
              setFuelConsumption={setFuelConsumption}
            />
            {/* Horizontal Section 2 */}
            <ProductionData
              coalProduction={coalProduction}
              setCoalProduction={setCoalProduction}
            />
          </div>

          {/* Right Column */}
          <ResourceUsage
            electricityUsage={electricityUsage}
            setElectricityUsage={setElectricityUsage}
            waterUsage={waterUsage}
            setWaterUsage={setWaterUsage}
            emissionLevel={emissionLevel}
            setEmissionLevel={setEmissionLevel}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataInput;
