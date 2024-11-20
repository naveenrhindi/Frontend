import React, { useState } from 'react';
import { FaDatabase, FaChartBar, FaLightbulb, FaCog, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
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
        <button onClick={toggleSidebar} className="text-white focus:outline-none absolute top-6 right-6">
          <FaBars className="w-6 h-6" />
        </button>
      </div>
      {isOpen && (
        <nav className="flex flex-col space-y-4">
          <div>
            <p className="text-gray-400 text-sm mb-2">DATA INPUT</p>
            <Link to="/dataInput" className="text-white hover:text-gray-400 flex items-center">
              <FaDatabase className="w-6 h-6 mr-2 ml-6" />
              <span>Data Input</span>
            </Link>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">VISUALIZE</p>
            <Link to="/visualise" className="text-white hover:text-gray-400 flex items-center">
              <FaChartBar className="w-6 h-6 mr-2 ml-6" />
              <span>Visualize</span>
            </Link>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">SUGGESTIONS</p>
            <Link to="/suggestions" className="text-white hover:text-gray-400 flex items-center">
              <FaLightbulb className="w-6 h-6 mr-2 ml-6" />
              <span>Suggestions</span>
            </Link>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">CHARTS</p>
            <button className="text-white hover:text-gray-400 flex items-center" onClick={toggleCharts}>
              <FaChartBar className="w-6 h-6 mr-2 ml-6" />
              <span>Charts</span>
            </button>
            {chartsOpen && (
              <div className="ml-10">
                <Link to="/chartOne" className="text-white hover:text-gray-400">
                  <span>Area Chart</span>
                </Link>
                <Link to="/chartTwo" className="text-white hover:text-gray-400">
                  <span>Bar Chart</span>
                </Link>
                <Link to="/chartThree" className="text-white hover:text-gray-400">
                  <span>Donut Chart</span>
                </Link>
              </div>
            )}
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">OTHERS</p>
            <Link to="/accountSettings" className="text-white hover:text-gray-400 flex items-center">
              <FaCog className="w-6 h-6 mr-2 ml-6" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Sidebar;
