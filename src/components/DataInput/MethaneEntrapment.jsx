import React from 'react';
import SelectGroup from './SelectGroup';

const MethaneEntrapment = ({ methaneCapture, setMethaneCapture }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Methane Entrapment Data</h3>

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="methaneCapture">
        Methane Capture Rate (m³)
      </label>
      <input
        type="number"
        id="methaneCapture"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        value={methaneCapture}
        onChange={(e) => setMethaneCapture(e.target.value)}
        placeholder="Enter methane capture rate"
      />
    </div>

    <SelectGroup
      label="Capture Method"
      options={[
        'Pre-mining Drainage',
        'Post-mining Drainage',
        'Ventilation Air Methane (VAM)',
        'Gob Vent Boreholes',
        'Surface to In-Seam'
      ]}
      onChange={() => {}}
    />

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="purity">
        Methane Purity (%)
      </label>
      <input
        type="number"
        id="purity"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        placeholder="Enter methane purity percentage"
        min="0"
        max="100"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="pressure">
        System Pressure (kPa)
      </label>
      <input
        type="number"
        id="pressure"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        placeholder="Enter system pressure"
      />
    </div>
  </div>
);

export default MethaneEntrapment;
