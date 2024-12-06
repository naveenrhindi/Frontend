import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaCamera, FaWhatsapp } from 'react-icons/fa';

const MyProfile = ({ ownerData }) => {
  const [bgImage, setBgImage] = useState('https://via.placeholder.com/600x300');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');

  const handleChangeBgImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const profileUrl = `https://www.coalmineprofile.com/${ownerData.name.replace(/\s+/g, '').toLowerCase()}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality for the submit button here
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8 flex flex-col items-center">
      {/* Coal Mine Image */}
      <div className="relative w-full h-48 bg-cover bg-c
      
      
      
      
      
      nter rounded-lg mb-16" style={{ backgroundImage: `url('${bgImage}')` }}>
        {/* Change Background Image Icon */}
        <label htmlFor="bgImageInput" className="absolute top-2 right-2 cursor-pointer">
          <FaCamera className="text-white bg-blue-500 rounded-full p-1 w-8 h-8" />
          <input
            type="file"
            id="bgImageInput"
            className="hidden"
            accept="image/*"
            onChange={handleChangeBgImage}
          />
        </label>
        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img src={profileImage} alt="Owner Profile" className="rounded-full border-4 border-white dark:border-gray-800 w-24 h-24 object-cover" />
          {/* Change Profile Image Icon */}
          <label htmlFor="profileImageInput" className="absolute bottom-0 right-0 cursor-pointer">
            <FaCamera className="text-white bg-blue-500 rounded-full p-1 w-8 h-8" />
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              accept="image/*"
              onChange={handleChangeProfileImage}
            />
          </label>
        </div>
      </div>

      {/* Owner Name */}
      <div className="text-center mt-8 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{ownerData.name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{ownerData.coalMineName} ({ownerData.address})</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href={`https://facebook.com/sharer/sharer.php?u=${profileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href={`https://twitter.com/share?url=${profileUrl}&text=Check out this amazing coal mine profile!`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${profileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href={`https://wa.me/?text=Check out this amazing coal mine profile! ${profileUrl}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">
            <FaWhatsapp className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* About Section */}
      <div className="text-center mt-8 w-2/4 mb-20">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">About the Coal Mine</h3>
        <p className="text-gray-800 dark:text-gray-300 mb-18 gap-1">
          {ownerData.about}
        </p>
      </div>

      {/* Add a form with a submit button here */}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="w-full text-green-600 border border-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
