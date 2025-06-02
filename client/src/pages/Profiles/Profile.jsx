import React, { useEffect, useState } from "react";
import "./Profile.css";
import Sidebar from "./../Sidebar/Sidebar";
import mdp from "./../../assets/mdp.jpg";
import { getUserData } from "../../services/dataService";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setUserType(userData.profile.role);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await getUserData();

      if (!userData || !userData.profile) {
        throw new Error("Could not load profile data");
      }

      console.log("Loaded profile:", userData.profile);
      setUserProfile(userData.profile);
    } catch (err) {
      console.error("Error loading profile:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar userType={userType} />

      <main className="flex-1 lg:ml-64 ml-0 bg-gray-50">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-56">
                <div className="absolute inset-0 gradient-bg"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex items-end">
                  <div className="flex items-center space-x-6">
                    <img
                      src={userProfile.profile_photo_url || mdp}
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-[3px] border-white"
                      alt="Profile Photo"
                    />
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold">
                        {userProfile.full_name}
                      </h1>
                      <p className="text-base lg:text-lg opacity-90">
                        {userProfile.role === "student"
                          ? `Student at ${userProfile.institute}`
                          : `${userProfile.current_job_title} at ${userProfile.current_company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {userProfile.role === "student"
                      ? "Academic Summary"
                      : "Professional Summary"}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {userProfile.profile_summary}
                  </p>
                </div>
              </div>

              <div className="col-span-1 space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {userProfile.role === "student"
                      ? "Technical Skills"
                      : "Skills & Expertise"}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills_expertise?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-[#415B68] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-3 space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {userProfile.role === "student"
                      ? "Academic Timeline"
                      : "Experience Timeline"}
                  </h2>
                  <div className="space-y-6">
                    {userProfile.role === "student" ? (
                      <div className="flex">
                        <div>
                          <h3 className="font-semibold">
                            {userProfile.course}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {userProfile.institute}
                          </p>
                          <p className="text-sm text-gray-500">
                            {userProfile.graduation_year
                              ? `Graduating ${userProfile.graduation_year}`
                              : "Current Student"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        <div>
                          <h3 className="font-semibold">
                            {userProfile.current_company}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {userProfile.current_job_title}
                          </p>
                          <p className="text-sm text-gray-500">Present</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
