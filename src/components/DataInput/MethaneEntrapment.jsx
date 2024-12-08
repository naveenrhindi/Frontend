import React from 'react';
import SelectGroup from './SelectGroup';

const MethaneEntrapment = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      methaneEntrapment: {
        ...prev.methaneEntrapment,
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Methane Entrapment Data</h3>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="captureRate">
          Methane Capture Rate (m³/day)
        </label>
        <input
          type="number"
          id="captureRate"
          className="w-full p-2 border border-gray-300 rounded 
          bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
          focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
          focus:border-[#FFA500] hover:border-[#FFA500]"
          value={formData.methaneEntrapment?.captureRate || ''}
          onChange={(e) => handleChange('captureRate', e.target.value)}
          placeholder="Enter methane capture rate"
          required
        />
      </div>

      <SelectGroup
        label="Utilization Method"
        value={formData.methaneEntrapment?.utilizationMethod || ''}
        options={[
          'Power Generation',
          'Flaring',
          'Pipeline Injection',
          'Ventilation Air Methane',
          'Direct Use'
        ]}
        onChange={(value) => handleChange('utilizationMethod', value)}
        required
      />

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="dischargeAmount">
          Discharge Amount (m³/day)
        </label>
        <input
          type="number"
          id="dischargeAmount"
          className="w-full p-2 border border-gray-300 rounded 
          bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
          focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
          focus:border-[#FFA500] hover:border-[#FFA500]"
          value={formData.methaneEntrapment?.dischargeAmount || ''}
          onChange={(e) => handleChange('dischargeAmount', e.target.value)}
          placeholder="Enter discharge amount"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="conversionEfficiency">
          Conversion Efficiency (%)
        </label>
        <input
          type="number"
          id="conversionEfficiency"
          className="w-full p-2 border border-gray-300 rounded 
          bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
          focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
          focus:border-[#FFA500] hover:border-[#FFA500]"
          value={formData.methaneEntrapment?.conversionEfficiency || ''}
          onChange={(e) => handleChange('conversionEfficiency', e.target.value)}
          placeholder="Enter conversion efficiency"
          min="0"
          max="100"
          required
        />
      </div>
    </div>
  );
};

export default MethaneEntrapment;
