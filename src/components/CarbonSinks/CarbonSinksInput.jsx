import React from 'react';
import { motion } from 'framer-motion';
import { FaTree, FaSeedling, FaLeaf, FaMountain } from 'react-icons/fa';

const CarbonSinksInput = ({ type, data, onUpdate }) => {
  const handleInputChange = (field, value) => {
    if (typeof value === 'number') {
      value = value === 0 ? 0 : parseFloat(value.toString().replace(/^0+/, ''));
    }
    onUpdate({ ...data, [field]: value });
  };

  const inputClasses = "w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent";
  const cardClasses = "bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg";

  const renderAfforestationInputs = () => (
    <div className={cardClasses}>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={inputClasses}
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Area (hectares)
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={data.area || ''}
            onChange={(e) => handleInputChange('area', e.target.value === '' ? 0 : parseFloat(e.target.value))}
            className={inputClasses}
            placeholder="Enter area in hectares"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Tree Planting Rate (trees/hectare)
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={data.treePlantingRate || ''}
            onChange={(e) => handleInputChange('treePlantingRate', e.target.value === '' ? 0 : parseFloat(e.target.value))}
            className={inputClasses}
            placeholder="Enter planting rate"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Tree Type
          </label>
          <select
            value={data.treeType}
            onChange={(e) => handleInputChange('treeType', e.target.value)}
            className={inputClasses}
          >
            <option value="broadleaf">Broadleaf</option>
            <option value="evergreen">Evergreen</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Estimated Carbon Sequestration</span>
            <span className="text-lg font-semibold text-green-600">{data.estimatedCarbonSeq.toFixed(2)} tCO2/year</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBiodiversityInputs = () => (
    <div className={cardClasses}>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={inputClasses}
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Area (hectares)
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={data.area || ''}
            onChange={(e) => handleInputChange('area', e.target.value === '' ? 0 : parseFloat(e.target.value))}
            className={inputClasses}
            placeholder="Enter area in hectares"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Habitat Type
          </label>
          <select
            value={data.habitatType}
            onChange={(e) => handleInputChange('habitatType', e.target.value)}
            className={inputClasses}
          >
            <option value="wetland">Wetland</option>
            <option value="forest">Forest</option>
            <option value="grassland">Grassland</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Species Count
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={data.speciesCount || ''}
            onChange={(e) => handleInputChange('speciesCount', parseInt(e.target.value) || 0)}
            className={inputClasses}
            placeholder="Enter number of species"
          />
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Estimated Carbon Sequestration</span>
            <span className="text-lg font-semibold text-orange-600">{data.estimatedCarbonSeq.toFixed(2)} tCO2/year</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGreenTechnologyInputs = () => (
    <div className={cardClasses}>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={inputClasses}
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Technology Type
          </label>
          <select
            value={data.technologyType}
            onChange={(e) => handleInputChange('technologyType', e.target.value)}
            className={inputClasses}
          >
            <option value="solar">Solar Power</option>
            <option value="wind">Wind Power</option>
            <option value="hydro">Hydroelectric</option>
            <option value="biomass">Biomass</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Capacity (kW)
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={data.capacity || ''}
            onChange={(e) => handleInputChange('capacity', parseFloat(e.target.value) || 0)}
            className={inputClasses}
            placeholder="Enter capacity in kilowatts"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Efficiency (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={data.efficiency || ''}
            onChange={(e) => handleInputChange('efficiency', parseFloat(e.target.value) || 0)}
            className={inputClasses}
            placeholder="Enter efficiency percentage"
          />
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Estimated Carbon Sequestration</span>
            <span className="text-lg font-semibold text-yellow-600">{data.estimatedCarbonSeq.toFixed(2)} tCO2/year</span>
          </div>
        </div>
      </div>
    </div>
  );

  switch (type) {
    case 'afforestation':
      return renderAfforestationInputs();
    case 'biodiversityConservation':
      return renderBiodiversityInputs();
    case 'greenTechnology':
      return renderGreenTechnologyInputs();
    default:
      return null;
  }
};

export default CarbonSinksInput;
