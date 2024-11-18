import React from 'react';

const SelectGroup = ({ label, options, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <select
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-100 dark:hover:bg-blue-100"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroup;
