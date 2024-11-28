import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import ExportOptions from './components/Export/ExportOptions'; // Correct path for ExportOptions component
import CarbonSinks from './components/CarbonSinks/CarbonSinks';

const App = () => {
  const [ownerData, setOwnerData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Coal Mine Road, Mining Town",
    coalMineName: "John's Coal Mine",
    about: "Riverstone Coal Mine is a leading coal mining operation located in India, established in 1985. With a focus on safety, sustainability, and innovation, we extract high-quality coal using advanced mining techniques. Our commitment to reducing environmental impact and supporting local communities is at the core of our operations through continuous investment in modern technologies."
  });

  const inputData = [
    { parameter: "Daily Production (tons)", value: 1500 },
    { parameter: "Employee Count", value: 200 },
    { parameter: "Safety Incidents", value: 2 },
    { parameter: "Operational Hours", value: 24 },
  ];
  
  const suggestions = [
    { parameter: "Emission Reduction", value: "Implement scrubbers to reduce emissions by 15%" },
    { parameter: "Water Usage Optimization", value: "Recycle 50% of water used in operations" },
    { parameter: "Safety Improvement", value: "Conduct bi-weekly safety drills" },
  ];

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-grow bg-white">
          <Header 
            ownerData={ownerData}
            onProfileClick={() => { window.location.href = '/myProfile' }} 
            onAccountSettingsClick={() => { window.location.href = '/accountSettings' }} 
            onSectionChange={(section) => { 
              if (section === 'dashboard') window.location.href = '/visualise';
              else if (section === 'emissionData') window.location.href = '/dataInput';
              else if (section === 'carbonSinks') window.location.href = '/carbonSinks';
              else if (section === 'pathways') window.location.href = '/suggestions';
              else if (section === 'reports') window.location.href = '/reports';
            }}
          />
          <main className="p-8 bg-white dark:bg-white flex-grow overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dataInput" />} />
              <Route path="/dataInput" element={<DataInput />} />
              <Route path="/visualise" element={<Visualization />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/myProfile" element={<MyProfile ownerData={ownerData} />} />
              <Route path="/accountSettings" element={<AccountSettings ownerData={ownerData} onSave={setOwnerData} />} />
              <Route path="/chartOne" element={<ChartOne />} />
              <Route path="/chartTwo" element={<ChartTwo />} />
              <Route path="/chartThree" element={<ChartThree />} />
              <Route path="/carbonSinks" element={<CarbonSinks />} />
              <Route path="/reports" element={
                <div>
                  <h1 className="text-2xl font-bold mb-4">Reports</h1>
                  <ExportOptions
                    inputData={inputData}
                    suggestions={suggestions}
                  />
                </div>
              } />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
