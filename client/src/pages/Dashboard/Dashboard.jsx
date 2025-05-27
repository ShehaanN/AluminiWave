import dp from "..//../assets/mdp.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import sara from "../../assets/sara.png";
import { getUserData } from "../../services/dataService";
import { useEffect, useState } from "react";

const Dashboard = () => {
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
  return (
    <div className="min-h-screen flex">
      <Sidebar userType={userType} />

      <main className="flex-1 ml-64 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 py-10">
          <div className="mb-8 flex flex-row w-full justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, Alex!
              </h1>
            </div>
            <div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="size-12">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/settings">
                      <DropdownMenuItem>Update Profile</DropdownMenuItem>
                    </Link>

                    <Link to="/">
                      <DropdownMenuItem>Log out</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          {/* --------------------------- */}

          {userType === "alumni" && (
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i
                        className="fas fa-calendar text-[#269EB2] fill-current"
                        style={{ color: "var(--color-aluwave)" }}
                      ></i>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    UPCOMING EVENTS
                  </h3>
                </div>
                <div className="mt-4 flex  gap-3">
                  <button className="!rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
                    More Events
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i
                      className="fas fa-users "
                      style={{ color: "var(--color-aluwave)" }}
                    ></i>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">MENTORSHIPS</h3>

                <div className="mt-4 flex gap-3">
                  <button className="!rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
                    Review
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-briefcase text-[#269EB2]"></i>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">
                  JOB OPPOTUNITIES
                </h3>

                <div className="mt-4 flex gap-3">
                  <button className="!rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          )}

          {userType === "student" && (
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-calendar text-[#269EB2] fill-current"></i>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    UPCOMING EVENTS
                  </h3>
                </div>
                <div className="mt-4 flex  gap-3">
                  <button className="!rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
                    More Events
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-[#269EB2] "></i>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">MENTORSHIPS</h3>

                <div className="mt-4 flex gap-3">
                  <button className="!rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
                    Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ------------------ */}
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Upcoming Events
              </h2>
              <div className="flex gap-4 border-b border-gray-200">
                <button className="px-4 py-2  text-[#269EB2] border-b-2 border-[#269EB2] font-medium">
                  Events
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-users text-[#269EB2]"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        Tech Career Fair
                      </h4>
                      <p className="text-sm text-gray-500">
                        May 15, 2023 • Virtual Event
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-users text-[#269EB2]"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        Alumni Networking Mixer
                      </h4>
                      <p className="text-sm text-gray-500">
                        June 2, 2023 • Campus Center
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-users text-[#269EB2]"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        Resume Workshop
                      </h4>
                      <p className="text-sm text-gray-500">
                        June 10, 2023 • Online
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button className="!rounded-button rounded-lg w-full bg-[#269EB2] text-white py-2 font-medium">
                  View All Events
                </button>
              </div>
            </div>
          </div>
          {/* --------------------------- */}
          {userType === "alumni" && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Mentorship Activity
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <img
                        src={dp}
                        className="w-10 h-10 rounded-full"
                        alt="Sarah Chen"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">
                          Sarah Chen
                        </h4>
                        <p className="text-sm text-gray-500">
                          Software Engineering Student
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Seeking guidance in software engineering career paths
                    </p>
                    <div className="flex gap-3">
                      <button className="!rounded-button rounded-lg flex-1 bg-[#269EB2] text-white py-2 text-sm font-medium">
                        Accept
                      </button>
                      <button className="!rounded-button rounded-lg flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <img
                        src={dp}
                        className="w-10 h-10 rounded-full"
                        alt="Michael Rodriguez"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">
                          Michael Rodriguez
                        </h4>
                        <p className="text-sm text-gray-500">
                          Data Science Student
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Looking for advice on data science internships
                    </p>
                    <div className="flex gap-3">
                      <button className="!rounded-button rounded-lg flex-1 bg-[#269EB2] text-white py-2 text-sm font-medium">
                        Accept
                      </button>
                      <button className="!rounded-button rounded-lg flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border className-gray-200">
                    <div className="flex items-center mb-4">
                      <img
                        src={dp}
                        className="w-10 h-10 rounded-full"
                        alt="Jamie Wilson"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">
                          Jamie Wilson
                        </h4>
                        <p className="text-sm text-gray-500">
                          UX/UI Design Student
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Interested in discussing UX/UI design industry trends
                    </p>
                    <div className="flex gap-3">
                      <button className="!rounded-button rounded-lg flex-1 bg-[#269EB2] text-white py-2 text-sm font-medium">
                        Accept
                      </button>
                      <button className="!rounded-button rounded-lg flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Career Resources
                  </h2>
                  <div className="divide-y divide-gray-200">
                    <div className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <i className="fas fa-briefcase text-[#269EB2]"></i>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">
                            Senior Software Engineer
                          </h4>
                          <p className="text-sm text-gray-500">
                            TechCorp • Remote
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          Posted 2 days ago
                        </span>
                      </div>
                    </div>

                    <div className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <i className="fas fa-briefcase text-[#269EB2]"></i>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">
                            Data Scientist
                          </h4>
                          <p className="text-sm text-gray-500">
                            Analytics Inc. • New York, NY
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          Posted 3 days ago
                        </span>
                      </div>
                    </div>

                    <div className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <i className="fas fa-briefcase text-[#269EB2]"></i>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">
                            UX/UI Designer
                          </h4>
                          <p className="text-sm text-gray-500">
                            Creative Solutions • San Francisco, CA
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          Posted 5 days ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="!rounded-button rounded-lg w-full bg-[#269EB2] text-white py-2 font-medium">
                      View All Jobs
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {userType === "student" && (
            <div className="bg-white rounded-lg border border-gray-200 mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Active Mentorships
                </h2>
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={sara} className="w-12 h-12 rounded-full" />
                        <div className="ml-4">
                          <h3 className="font-semibold">
                            Session with Dr. Sarah Johnson
                          </h3>
                          <p className="text-sm text-gray-600">
                            Meeting: June 25 , 8:00 PM
                          </p>
                        </div>
                      </div>
                      <Link to="/activementorships">
                        <button className="px-4 py-2 bg-[#269EB2] text-white rounded-lg">
                          View Session
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------- */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
