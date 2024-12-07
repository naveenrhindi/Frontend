import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from './services/userService';

// Landing components
import Login from './components/Landing/Login';
import Register from './components/Landing/Register';

// Dashboard components
import Header from './components/Header';
import Visualise from './components/Visualise/Visualise';
import DataInput from './components/DataInput/DataInput';
import CarbonSinks from './components/CarbonSinks/CarbonSinks';
import Suggestions from './components/Suggestions/Suggestion';
import Reports from './components/Export/ExportOptions';
import MyProfile from './components/UserProfile/MyProfile';
import AccountSettings from './components/UserProfile/AccountSettings';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Transform user data for Header component
  const headerData = user ? {
    name: user.fullname || user.username,
    email: user.email,
    role: "User",
    location: user.location
  } : {};

  return (
    <div className="min-h-screen bg-gray-100">
      <Header ownerData={headerData} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Visualise />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/visualise" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Visualise />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/dataInput" element={
          <ProtectedRoute>
            <DashboardLayout>
              <DataInput />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/carbonSinks" element={
          <ProtectedRoute>
            <DashboardLayout>
              <CarbonSinks />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/suggestions" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Suggestions />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/reports" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/myProfile" element={
          <ProtectedRoute>
            <DashboardLayout>
              <MyProfile />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/accountSettings" element={
          <ProtectedRoute>
            <DashboardLayout>
              <AccountSettings />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Redirect root to dashboard if authenticated, otherwise to login */}
        <Route path="/" element={
          isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
        } />

        {/* Catch all route - redirect to dashboard if authenticated, otherwise to login */}
        <Route path="*" element={
          isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
