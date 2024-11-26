import React, { useState } from 'react';

const AccountSettings = ({ ownerData, onSave }) => {
  const [name, setName] = useState(ownerData.name);
  const [phone, setPhone] = useState(ownerData.phone);
  const [email, setEmail] = useState(ownerData.email);
  const [mineName, setMineName] = useState(ownerData.coalMineName);
  const [mineAddress, setMineAddress] = useState(ownerData.address);
  const [about, setAbout] = useState(ownerData.about || '');

  const handleSave = () => {
    const updatedData = {
      name,
      phone,
      email,
      coalMineName: mineName,
      address: mineAddress,
      about
    };
    onSave(updatedData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 ml-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Account Settings</h2>
        
        {/* Personal Information */}
        <div className="personal-info mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h3>
          <label className="text-gray-600" htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            className="w-full p-2 mb-4 bg-white border border-gray-300 text-gray-800 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-gray-600" htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            className="w-full p-2 mb-4 bg-white border border-gray-300 text-gray-800 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label className="text-gray-600" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mb-4 bg-white border border-gray-300 text-gray-800 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Mine Information */}
        <div className="mine-info mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mine Information</h3>
          <label className="text-gray-600" htmlFor="mine-name">Mine Name</label>
          <input
            type="text"
            id="mine-name"
            className="w-full p-2 mb-4 bg-white border border-gray-300 text-gray-800 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={mineName}
            onChange={(e) => setMineName(e.target.value)}
          />
          <label className="text-gray-600" htmlFor="mine-address">Mine Address</label>
          <input
            type="text"
            id="mine-address"
            className="w-full p-2 mb-4 bg-white border border-gray-300 text-gray-800 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={mineAddress}
            onChange={(e) => setMineAddress(e.target.value)}
          />
        </div>

        {/* About Section */}
        <div className="about-section mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">About</h3>
          <label className="text-gray-600" htmlFor="about">Description</label>
          <textarea
            id="about"
            className="w-full p-2 mb-4 bg-white border border-gray-300 text-gray-800 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 h-32"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
