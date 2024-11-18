import React from 'react';

const ProductionData = ({ coalProduction, setCoalProduction }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-white mb-2">Production Data</h3>
    <div className="mb-4">
      <label className="block text-gray-400 mb-2" htmlFor="coalProduction">Coal Production (tons)</label>
      <input
        type="number"
        id="coalProduction"
        className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
        value={coalProduction}
        onChange={(e) => setCoalProduction(e.target.value)}
        placeholder="Enter coal production"
      />
    </div>
  </div>
);

export default ProductionData;
