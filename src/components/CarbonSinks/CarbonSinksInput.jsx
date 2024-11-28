import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTree, FaSeedling, FaLeaf, FaMountain } from 'react-icons/fa';

const CarbonSinksInput = ({ activeTab, data, onUpdate }) => {
  const handleInputChange = (field, value) => {
    onUpdate({
      ...data,
      [activeTab]: {
        ...data[activeTab],
        [field]: value
      }
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        {activeTab === 'afforestation' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <FaTree className="text-2xl text-primary" />
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Afforestation Management
              </h3>
            </div>
            <div className="space-y-4">
              <div className="form-group">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Area (hectares)
                </label>
                <input
                  type="number"
                  value={data.afforestation.area}
                  onChange={(e) => handleInputChange('area', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  placeholder="Enter area in hectares"
                />
              </div>
              <div className="form-group">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Planting Rate (trees/hectare)
                </label>
                <input
                  type="number"
                  value={data.afforestation.plantingRate}
                  onChange={(e) => handleInputChange('plantingRate', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  placeholder="Enter planting rate"
                />
              </div>
              <div className="form-group">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Tree Type
                </label>
                <select
                  value={data.afforestation.treeType}
                  onChange={(e) => handleInputChange('treeType', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="broadleaf">Broadleaf</option>
                  <option value="evergreen">Evergreen</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'soilCarbon' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <FaLeaf className="text-2xl text-primary" />
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Soil Carbon Management
              </h3>
            </div>
            <div className="space-y-4">
              <div className="form-group">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Area (hectares)
                </label>
                <input
                  type="number"
                  value={data.soilCarbon.area}
                  onChange={(e) => handleInputChange('area', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  placeholder="Enter area in hectares"
                />
              </div>
              <div className="form-group">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Management Type
                </label>
                <select
                  value={data.soilCarbon.managementType}
                  onChange={(e) => handleInputChange('managementType', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="organic">Organic Addition</option>
                  <option value="conservation">Conservation Tillage</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'grassland' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <FaMountain className="text-2xl text-primary" />
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Grassland Restoration
              </h3>
            </div>
            <div className="space-y-4">
              <div className="form-group">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Area (hectares)
                </label>
                <input
                  type="number"
                  value={data.grassland.area}
                  onChange={(e) => handleInputChange('area', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  placeholder="Enter area in hectares"
                />
              </div>
              <div className="form-group">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Grass Type
                </label>
                <select
                  value={data.grassland.grassType}
                  onChange={(e) => handleInputChange('grassType', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="native">Native Species</option>
                  <option value="perennial">Perennial Grasses</option>
                  <option value="mixed">Mixed Species</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CarbonSinksInput;
