import React, { useState } from 'react';
import { FaDatabase, FaChartBar, FaLightbulb, FaCog, FaBars, FaTree } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { id: 1, title: "DATA INPUT", icon: FaDatabase, path: "/dashboard/dataInput" },
    { id: 2, title: "CARBON SINKS", icon: FaTree, path: "/dashboard/carbonSinks" },
    { id: 3, title: "VISUALIZE", icon: FaChartBar, path: "/dashboard/visualise" },
    { id: 4, title: "SUGGESTIONS", icon: FaLightbulb, path: "/dashboard/suggestions" },
    { id: 5, title: "SETTINGS", icon: FaCog, path: "/dashboard/accountSettings" }
  ];

  return (
    <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-20'} bg-black min-h-screen p-5 pt-8 relative duration-300`}>
      <button 
        onClick={toggleSidebar} 
        className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 h-7 border-2 border-black bg-white hover:bg-gray-100 flex items-center justify-center ${!isOpen && "rotate-180"}`}
      >
        <FaBars className="text-black text-sm" />
      </button>

      <div className="flex gap-x-4 items-center mb-12">
        <div className={`cursor-pointer duration-500 ${!isOpen && "rotate-[360deg]"}`}>
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">C</span>
          </div>
        </div>
        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!isOpen && "scale-0"}`}>
          CarbonTrack
        </h1>
      </div>

      <div className="flex flex-col gap-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-x-4 cursor-pointer p-3 hover:bg-gray-900 rounded-lg transition-all duration-200
              ${isActiveLink(item.path) ? 'bg-gray-900 border-l-4 border-green-500' : 'text-gray-300'}`}
          >
            <item.icon className={`text-xl ${isActiveLink(item.path) ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={`${!isOpen && 'hidden'} origin-left duration-200 text-sm font-medium
              ${isActiveLink(item.path) ? 'text-green-500' : 'text-gray-300'}`}>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
