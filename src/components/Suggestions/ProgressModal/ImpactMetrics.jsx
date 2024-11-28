import React from 'react';

const ImpactMetrics = ({ suggestion, savedData, onUpdate }) => {
  const metrics = {
    emissionReduction: savedData?.impact?.emissionReduction || 0,
    costSaving: savedData?.impact?.costSaving || 0,
    resourceSaved: savedData?.impact?.resourceSaved || 0
  };

  const handleMetricChange = (metric, value) => {
    console.log('Metric change:', metric, value);
    onUpdate({
      impact: {
        ...metrics,
        [metric]: parseFloat(value)
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Impact Metrics</h3>
      
      <div className="grid gap-4">
        {/* CO2 Emissions Reduction */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CO₂ Emissions Reduction (kg)
          </label>
          <input
            type="number"
            value={metrics.emissionReduction}
            onChange={(e) => handleMetricChange('emissionReduction', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            placeholder="0"
            min="0"
          />
        </div>

        {/* Cost Savings */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cost Savings (₹)
          </label>
          <input
            type="number"
            value={metrics.costSaving}
            onChange={(e) => handleMetricChange('costSaving', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            placeholder="0"
            min="0"
          />
        </div>

        {/* Resource Conservation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resources Saved (units)
          </label>
          <input
            type="number"
            value={metrics.resourceSaved}
            onChange={(e) => handleMetricChange('resourceSaved', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            placeholder="0"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;
