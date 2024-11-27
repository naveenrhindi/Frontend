import React from 'react';

const ProductionData = ({ coalProduction, setCoalProduction }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Production Data</h3>
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="coalProduction">
        Coal Production (tons)
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
        placeholder="Enter coal production"
      />
    </div>
  </div>
);

export default ProductionData;
