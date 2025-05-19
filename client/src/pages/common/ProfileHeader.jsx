import React from 'react';

function ProfileHeader({ name, title, imageSrc }) {
    return (
    <div className="bg-gradient-to-r from-teal-700 to-teal-500 rounded-md p-6 text-white mb-6">
      <div className="flex items-center">
        <div className="bg-white rounded-full p-1 mr-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img 
              src={imageSrc || "/api/placeholder/80/80"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p>{title}</p>
        </div>
      </div>
    </div>
    );
}

export default ProfileHeader;