import React, { useState } from 'react';
import { FaDatabase, FaChartBar, FaLightbulb, FaCog, FaBars } from 'react-icons/fa';

function Sidebar({ onSelect }) {
  const [isOpen, setIsOpen] = useState(true);
  const [chartsOpen, setChartsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCharts = () => {
    setChartsOpen(!chartsOpen);
  };

  return (
    <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-20'} bg-gray-900 dark:bg-gray-800 h-screen p-10 transition-width duration-300 relative`}>
      <div className="flex justify-between items-center mb-8 overflow-y-hidden">
        {/* Logo */}
        {isOpen && (
          <div className="flex items-center">
            <img 
              src="https://via.placeholder.com/50" 
              alt="Logo" 
              className="w-12 h-12 mr-2 rounded-full my-8"
            />      
            <span className="text-white text-center text-2xl font-bold">Logo</span>
          </div>
        )}
        
        {/* Hamburger Icon */}
        <button onClick={toggleSidebar} className="text-white focus:outline-none absolute top-6 right-6">
          <FaBars className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      {isOpen && (
        <nav className="flex flex-col space-y-4">
          {/* Data Input Section */}
          <div className=''>
            <p className="text-gray-400 text-sm mb-2">DATA INPUT</p>
            <a href="#" className="text-white hover:text-gray-400 flex items-center" onClick={() => onSelect('dataInput')}>
              <FaDatabase className="w-6 h-6 mr-2 ml-6" />
              {isOpen && <span>Data Input</span>}
            </a>
          </div>
          
          {/* Visualize Section */}
          <div>
            <p className="text-gray-400 text-sm mb-2">VISUALIZE</p>
            <a href="#" className="text-white hover:text-gray-400 flex items-center" onClick={() => onSelect('visualize')}>
              <FaChartBar className="w-6 h-6 mr-2 ml-6" />
              {isOpen && <span>Visualize</span>}
            </a>
          </div>

          {/* Suggestions Section */}
          <div>
            <p className="text-gray-400 text-sm mb-2">SUGGESTIONS</p>
            <a href="#" className="text-white hover:text-gray-400 flex items-center" onClick={() => onSelect('suggestions')}>
              <FaLightbulb className="w-6 h-6 mr-2 ml-6" />
              {isOpen && <span>Suggestions</span>}
            </a>
          </div>

          {/* Charts Dropdown */}
          <div>
            <p className="text-gray-400 text-sm mb-2">CHARTS</p>
            <button className="text-white hover:text-gray-400 flex items-center" onClick={toggleCharts}>
              <FaChartBar className="w-6 h-6 mr-2 ml-6" />
              {isOpen && <span>Charts</span>}
            </button>
            {chartsOpen && (
              <div className="ml-10">
                <a href="#" className="text-white hover:text-gray-400" onClick={() => onSelect('areaChart')}>
                  {isOpen && <span>Area Chart</span>}
                </a>
                <a href="#" className="text-white hover:text-gray-400" onClick={() => onSelect('barChart')}>
                  {isOpen && <span>Bar Chart</span>}
                </a>
                <a href="#" className="text-white hover:text-gray-400" onClick={() => onSelect('donutChart')}>
                  {isOpen && <span>Donut Chart</span>}
                </a>
              </div>
            )}
          </div>

          {/* Settings */}
          <div>
            <p className="text-gray-400 text-sm mb-2">OTHERS</p>
            <a href="#" className="text-white hover:text-gray-400 flex items-center" onClick={() => onSelect('settings')}>
              <FaCog className="w-6 h-6 mr-2 ml-6" />
              {isOpen && <span>Settings</span>}
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Sidebar;
