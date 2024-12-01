import React from 'react';
import SelectGroup from './SelectGroup';

const ProductionData = ({ coalProduction, setCoalProduction }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Transportation Data</h3>
    
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="coalProduction">
        Amount of Coal Transported (tons)
      </label>
      <input
        type="number"
        id="coalProduction"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        value={coalProduction}
        onChange={(e) => setCoalProduction(e.target.value)}
        placeholder="Enter amount of coal transported"
      />
    </div>

    <SelectGroup
      label="Mode of Transport"
      options={['Haul Trucks', 'Conveyor Systems', 'Mine Cars', 'Shuttle Cars', 'Rail Transport']}
      onChange={() => {}}
    />

    <SelectGroup
      label="Transport Fuel Type"
      options={['Diesel', 'Electric', 'Hybrid']}
      onChange={() => {}}
    />

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="distance">
        Distance Covered per Trip (meters)
      </label>
      <input
        type="number"
        id="distance"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        placeholder="Enter distance covered per trip"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="capacity">
        Vehicle/System Capacity (tons)
      </label>
      <input
        type="number"
        id="capacity"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        placeholder="Enter transport capacity"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="trips">
        Number of Trips per Day
      </label>
      <input
        type="number"
        id="trips"
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        placeholder="Enter number of trips per day"
      />
    </div>
  </div>
);

export default ProductionData;
