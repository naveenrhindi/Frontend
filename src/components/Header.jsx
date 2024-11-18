import React, { useState } from 'react';

function Header({ onProfileClick, onAccountSettingsClick, onSectionChange, ownerData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-gray-900 dark:bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="text-2xl font-bold">
        <a href="#" className="hover:text-gray-300">Coal Mine Owner Dashboard</a>
      </div>
      
      <nav className="space-x-4 mt-2 sm:mt-0">
        <button onClick={() => onSectionChange('dashboard')} className="hover:text-gray-400">Dashboard</button>
        <button onClick={() => onSectionChange('emissionData')} className="hover:text-gray-400">Emission Data</button>
        <button onClick={() => onSectionChange('carbonSinks')} className="hover:text-gray-400">Carbon Sinks</button>
        <button onClick={() => onSectionChange('pathways')} className="hover:text-gray-400">Pathways</button>
        <button onClick={() => onSectionChange('reports')} className="hover:text-gray-400">Reports</button>
      </nav>

      <div className="relative mt-2 sm:mt-0">
        <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
          <img 
            src="https://via.placeholder.com/40" 
            alt="User Profile" 
            className="rounded-full w-10 h-10"
          />
          <span>{ownerData.name}</span>
          <svg 
            className={`w-4 h-4 transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg py-2 z-50">
            <button onClick={() => { toggleDropdown(); onProfileClick(); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Profile</button>
            <button onClick={() => { toggleDropdown(); onAccountSettingsClick(); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Account Settings</button>
            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
