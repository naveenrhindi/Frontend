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

const App = () => {
  const [ownerData, setOwnerData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Coal Mine Road, Mining Town",
    coalMineName: "John's Coal Mine",
    about: "Riverstone Coal Mine is a leading coal mining operation located in India, established in 1985. With a focus on safety, sustainability, and innovation, we extract high-quality coal using advanced mining techniques. Our commitment to reducing environmental impact and supporting local communities is at the core of our operations through continuous investment in modern technologies."
  });

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header 
            ownerData={ownerData}
            onProfileClick={() => { window.location.href = '/myProfile' }} 
            onAccountSettingsClick={() => { window.location.href = '/accountSettings' }} 
            onSectionChange={() => { /* Section change handler */ }}
          />
          <main className="p-8 bg-gray-100 dark:bg-gray-900 flex-grow overflow-auto">
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
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
