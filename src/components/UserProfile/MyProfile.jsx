import React, { useState } from 'react';
import { getCurrentUser } from '../../services/userService';

const MyProfile = () => {
  const user = getCurrentUser();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  // Format the date or show 'Not available'
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Not available';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Not available';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-green-500">
              {user.fullname.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white">{user.fullname}</h1>
              <p className="text-green-100">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Username</h3>
                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1 text-lg text-gray-900">{user.fullname}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                <p className="mt-1 text-lg text-gray-900">{user.contact_no || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-lg text-gray-900">{user.location || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
