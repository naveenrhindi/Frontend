import React, { useState } from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DataInput from './components/DataInput/DataInput.jsx';
import Visualization from './components/Visualise/Visualise.jsx';
import Suggestions from './components/Suggestions/Suggestion.jsx';
import MyProfile from './components/UserProfile/MyProfile';
import AccountSettings from './components/UserProfile/AccountSettings';
import ChartOne from './components/Visualise/ChartOne'; // Import ChartOne component
import ChartTwo from './components/Visualise/ChartTwo'; // Import ChartTwo component
import ChartThree from './components/Visualise/ChartThree'; // Import ChartThree component

function DashboardLayout({ children }) {
  const [selectedSection, setSelectedSection] = useState('visualize'); // Default to visualize section
  const [ownerData, setOwnerData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Coal Mine Road, Mining Town",
    coalMineName: "John's Coal Mine",
    about: "Riverstone Coal Mine is a leading coal mining operation located in India, established in 1985. With a focus on safety, sustainability, and innovation, we extract high-quality coal using advanced mining techniques. Our commitment to reducing environmental impact and supporting local communities is at the core of our operations through continuous investment in modern technologies."
  });



  const renderContent = () => {
    const exampleData = {
      carbonEmissions: 60, // Example carbon emissions value
      waterUsage: 120, // Example water usage value
    };

    switch (selectedSection) {
      case 'emissionData':
      case 'dataInput':
        return <DataInput />;
      case 'visualize':
      case 'dashboard':
        return <Visualization />;
      case 'suggestions':
      case 'pathways': // Display Suggestions content for Pathways section
        return <Suggestions data={exampleData} />;
      case 'profile':
        return <MyProfile ownerData={ownerData} />;
      case 'settings':
        return <AccountSettings ownerData={ownerData} onSave={setOwnerData} />;
      case 'areaChart': // Display ChartOne component for AreaChart
        return <ChartOne />;
      case 'barChart': // Display ChartTwo component for BarChart
        return <ChartTwo />;
      case 'donutChart': // Display ChartThree component for DonutChart
        return <ChartThree />;
      
      case 'carbonSinks':
      case 'reports':
        return <div className="p-8">Content for {selectedSection}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelect={setSelectedSection} />
      <div className="flex flex-col flex-grow">
        <Header 
          ownerData={ownerData}
          onProfileClick={() => setSelectedSection('profile')} 
          onAccountSettingsClick={() => setSelectedSection('settings')} 
          onSectionChange={setSelectedSection}
        />
        <main className="p-8 bg-gray-100 dark:bg-gray-900 flex-grow overflow-auto">
          {renderContent()}
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
