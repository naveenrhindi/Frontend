import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/userService';

function Header({ ownerData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: 'Emission Data', path: '/dashboard/dataInput' },
    { label: 'Carbon Sinks', path: '/dashboard/carbonSinks' },
    { label: 'Visualise', path: '/dashboard/visualise' },
    
    
    { label: 'Pathways', path: '/dashboard/suggestions' },
    { label: 'Reports', path: '/dashboard/reports' }
  ];

  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-xl font-bold text-white">C</span>
        </div>
        <Link to="/dashboard" className="text-xl font-medium hover:text-green-500 transition-colors duration-200">
          CarbonTrack Dashboard
        </Link>
      </div>

      
      
      <nav className="flex items-center gap-2 mt-4 sm:mt-0">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
              ${isActive(item.path) 
                ? 'bg-green-500 text-white' 
                : 'text-gray-300 hover:bg-gray-800'
              }`}
          >
            {item.label}
          </Link>
        ))}

        <div className="relative ml-4">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {ownerData.name ? ownerData.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">{ownerData.name || 'User'}</p>
              <p className="text-xs text-gray-400">{ownerData.role || 'User'}</p>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  toggleDropdown();
                  navigate('/dashboard/myProfile');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  toggleDropdown();
                  navigate('/dashboard/accountSettings');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Account Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
