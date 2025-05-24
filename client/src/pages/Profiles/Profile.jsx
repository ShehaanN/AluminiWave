import React from "react";
import "./Profile.css";
import Sidebar from "./../Sidebar/Sidebar";
import mdp from "./../../assets/mdp.jpg";
import { getUserData } from "../../services/dataService";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const userData = await getUserData();

      if (userData) {
        setUserType(userData.profile.role);
      }
    };

    loadData();
  }, []);

  const alumni = {
    name: "Dr Sarah Johnson",
    title: "Senior Product Manager at Tech Corp",
    professinal_summary:
      "A results-driven product manager with 8+ years of experience in tech industry. Specialized in AI/ML products and data-driven decision making. Passionate about mentoring and helping others grow in their careers.",
    company: "Tech Corp",
    position: "Senior Product Manager",
    joinyear: 2020,
  };
  const student = {
    name: "Alex since",
    title: "Class of 2023, Computer Science Major",
    professinal_summary:
      " Final year Computer Science student with a focus on Artificial Intelligence and Machine Learning. Dean's List recipient for three consecutive semesters. Actively seeking opportunities in software development and data science fields.",
    course: " Bachelor of Science in Computer Science",
    institute: "University of Technology",
    passout: 2017,
  };

  const userData = userType === "student" ? student : alumni;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 lg:ml-64 ml-0 bg-gray-50">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-56">
                <div className="absolute inset-0 gradient-bg"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex items-end">
                  <div className="flex items-center space-x-6">
                    <img
                      src={mdp}
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-[3px] border-white"
                      alt="Profile Photo"
                    />
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold">
                        {userData.name}
                      </h1>
                      <p className="text-base lg:text-lg opacity-90">
                        {userData.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------------- */}
            <div className="grid grid-cols-3  gap-8 mt-8">
              <div className="col-span-2  space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {userType === "student" && (
                    <h2 className="text-xl font-semibold mb-4">
                      Academic Summary
                    </h2>
                  )}
                  {userType === "alumni" && (
                    <h2 className="text-xl font-semibold mb-4">
                      Professional Summary
                    </h2>
                  )}

                  <p className="text-gray-600 leading-relaxed">
                    {userData.professinal_summary}
                  </p>
                </div>
              </div>
              <div className="col-span-1 space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {userType === "student" && (
                    <h2 className="text-xl font-semibold mb-4">
                      Technical Skills
                    </h2>
                  )}
                  {userType === "alumni" && (
                    <h2 className="text-xl font-semibold mb-4">
                      Skills & Expertise
                    </h2>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-[#415B68] rounded-full text-sm">
                      Python
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-[#415B68] rounded-full text-sm">
                      Java
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-[#415B68] rounded-full text-sm">
                      Machine Learning
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-[#415B68] rounded-full text-sm">
                      Web Development
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-[#415B68] rounded-full text-sm">
                      SQL
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-3 space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {userType === "student" && (
                    <h2 className="text-xl font-semibold mb-4">
                      Academic Timeline
                    </h2>
                  )}
                  {userType === "alumni" && (
                    <h2 className="text-xl font-semibold mb-4">
                      Experience Timeline
                    </h2>
                  )}

                  <div className="space-y-6">
                    {userType === "student" && (
                      <div className="flex">
                        <div>
                          <h3 className="font-semibold">{student.course}</h3>
                          <p className="text-sm text-gray-600">
                            {student.institute}
                          </p>
                          <p className="text-sm text-gray-500">2020 - 2023</p>
                        </div>
                      </div>
                    )}

                    {userType === "alumni" && (
                      <div className="flex">
                        <div>
                          <h3 className="font-semibold">{alumni.company}</h3>
                          <p className="text-sm text-gray-600">
                            {alumni.position}
                          </p>
                          <p className="text-sm text-gray-500">2017 - 2020</p>
                          <p className="mt-2 text-gray-600">
                            Managed mobile app development team
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------- */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
