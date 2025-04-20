import React, { useState } from "react";
import SideBar from './components/Sidebar';
import MentorProfile from './pages/MentorProfile';
import StudentProfile from './pages/StudentProfile';

function App() {
  const [activeProfile, setActiveProfile] = useState('mentor');

  const toggleProfile = () => {
    setActiveProfile(activeProfile === 'mentor' ? 'student' : 'mentor');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      <SideBar />

      <div className="flex-1">
        <div className="p-4 max-w-6xl mx-auto">

          <button 
            onClick={toggleProfile}
            className="mb-4 bg-teal-500 text-white px-4 py-2 rounded-md"
            >
              Switch to {activeProfile === 'mentor' ? 'Student' : 'Mentor'} Profile
          </button>

          {activeProfile === 'mentor' ? <MentorProfile /> : <StudentProfile />}

        </div>
      </div>
    </div>
  );
}

export default App
