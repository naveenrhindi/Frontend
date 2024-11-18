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
    <div className="settings-container p-6 rounded-lg shadow-md mt-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Account Settings</h2>
        
        {/* Personal Information */}
        <div className="personal-info mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
          <label className="text-gray-600 dark:text-gray-400" htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            className="w-full p-2 mb-4 bg-gray-900 dark:bg-gray-700 text-white rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-gray-600 dark:text-gray-400" htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            className="w-full p-2 mb-4 bg-gray-900 dark:bg-gray-700 text-white rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label className="text-gray-600 dark:text-gray-400" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mb-4 bg-gray-900 dark:bg-gray-700 text-white rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Coal Mine Information */}
        <div className="coal-mine-info mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Coal Mine Information</h3>
          <label className="text-gray-600 dark:text-gray-400" htmlFor="mine-name">Mine Name</label>
          <input
            type="text"
            id="mine-name"
            className="w-full p-2 mb-4 bg-gray-900 dark:bg-gray-700 text-white rounded-md"
            value={mineName}
            onChange={(e) => setMineName(e.target.value)}
          />
          <label className="text-gray-600 dark:text-gray-400" htmlFor="mine-address">Mine Address</label>
          <input
            type="text"
            id="mine-address"
            className="w-full p-2 mb-4 bg-gray-900 dark:bg-gray-700 text-white rounded-md"
            value={mineAddress}
            onChange={(e) => setMineAddress(e.target.value)}
          />
        </div>

        {/* About Section */}
        <div className="about-info">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">About the Coal Mine</h3>
          <textarea
            id="about"
            className="w-full p-2 mb-4 bg-gray-900 dark:bg-gray-700 text-white rounded-md"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows="5"
          ></textarea>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end mt-6">
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md mr-4 transition duration-200">Save</button>
          <button className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition duration-200">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
