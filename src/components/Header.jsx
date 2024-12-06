import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ onProfileClick, onAccountSettingsClick, onSectionChange, ownerData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (path, section) => {
    if (path) {
      return location.pathname === path;
    }
    return activeSection === section;
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard/visualise' },
    { label: 'Emission Data', path: '/dashboard/dataInput' },
    { label: 'Carbon Sinks', path: '/dashboard/carbonSinks' },
    { label: 'Pathways', path: '/dashboard/suggestions' },
    { label: 'Reports', path: '/dashboard/reports' }
  ];

  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-xl font-bold text-white">C</span>
        </div>
        <Link to="/" className="text-xl font-medium hover:text-green-500 transition-colors duration-200">
          CarbonTrack Dashboard
        </Link>
      </div>
      
      <nav className="flex items-center gap-2 mt-4 sm:mt-0">
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.path ? (
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                  ${isActive(item.path) 
                    ? 'bg-gray-800 text-green-500' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-green-500'
                  }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                onClick={() => handleSectionChange(item.section)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                  ${isActive(null, item.section)
                    ? 'bg-gray-800 text-green-500'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-green-500'
                  }`}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="relative mt-4 sm:mt-0">
        <button 
          onClick={toggleDropdown} 
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">
              {ownerData.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-300">{ownerData.name}</span>
          <svg 
            className={`w-4 h-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-lg shadow-lg py-2 z-50 border border-gray-800">
            <button 
              onClick={() => { toggleDropdown(); onProfileClick(); }} 
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-green-500 transition-colors duration-200"
            >
              My Profile
            </button>
            <button 
              onClick={() => { toggleDropdown(); onAccountSettingsClick(); }} 
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-green-500 transition-colors duration-200"
            >
              Account Settings
            </button>
            <div className="border-t border-gray-800 my-1"></div>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-green-500 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
