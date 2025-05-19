import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [accountData, setAccountData] = useState({
    fullName: "",
    photo: null,
    gender: "",
    dob: "",
    contactNo: "",
    passoutYear: "",
    degreeProgram: "",
    occupation: "",
    headline: "",
    region: "",
  });

  const [profileData, setProfileData] = useState({
    academicSummary: "",
    technicalSkills: "",
    academicTimeline: {
      title: "",
      institution: "",
      duration: "",
      gpa: "",
    },
  });

  const handleAccountChange = (e) => {
    const { name, value, files, type } = e.target;
    setAccountData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    if (["title", "institution", "duration", "gpa"].includes(name)) {
      setProfileData((prev) => ({
        ...prev,
        academicTimeline: {
          ...prev.academicTimeline,
          [name]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    console.log("Account Data:", accountData);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", profileData);
  };

  return (
    <div>
      <div className="min-h-screen flex">
        <main className="flex-1 ml-0 bg-gray-50">
          <div className="p-6 mt-9">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between">
                <h1 className="font-semibold text-3xl mb-8 text-gray-700">
                  Settings
                </h1>

                <Link to="/dashboard">
                  <button className="px-6 py-2 bg-[#7a999e] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i class="fa-solid fa-xmark mr-2"></i>
                    Cancel
                  </button>
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <div className="flex lg:space-x-8 space-x-4 overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                        activeTab === "profile"
                          ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                          : "text-gray-500"
                      }`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab("account")}
                      className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                        activeTab === "account"
                          ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                          : "text-gray-500"
                      }`}
                    >
                      Account
                    </button>
                    <button
                      onClick={() => setActiveTab("changepassword")}
                      className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                        activeTab === "changepassword"
                          ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                          : "text-gray-500"
                      }`}
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-8 space-y-6">
                  {activeTab === "profile" && (
                    <form onSubmit={handleProfileSubmit}>
                      <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                        <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 cursor-move">
                          <div className="flex justify-between flex-wrap gap-4">
                            <div className="flex-1 min-w-[250px]">
                              <label>Academic Summary</label>
                              <textarea
                                name="academicSummary"
                                value={profileData.academicSummary}
                                onChange={handleProfileChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="flex-1 min-w-[250px]">
                              <label>Technical Skills</label>
                              <input
                                type="text"
                                name="technicalSkills"
                                value={profileData.technicalSkills}
                                onChange={handleProfileChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-full mt-4">
                              <label>Academic Timeline</label>
                              <div className="border-2 border-dashed p-4 rounded mb-3 space-y-2 border-gray-300 mt-2">
                                <div className="grid lg:grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={profileData.academicTimeline.title}
                                    onChange={handleProfileChange}
                                    className="border p-2 w-full"
                                  />
                                  <input
                                    type="text"
                                    name="institution"
                                    placeholder="Institution"
                                    value={
                                      profileData.academicTimeline.institution
                                    }
                                    onChange={handleProfileChange}
                                    className="border p-2 w-full"
                                  />
                                  <input
                                    type="text"
                                    name="duration"
                                    placeholder="Duration"
                                    value={
                                      profileData.academicTimeline.duration
                                    }
                                    onChange={handleProfileChange}
                                    className="border p-2 w-full"
                                  />
                                  <input
                                    type="text"
                                    name="gpa"
                                    placeholder="GPA (if any)"
                                    value={profileData.academicTimeline.gpa}
                                    onChange={handleProfileChange}
                                    className="border p-2 w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <button
                              type="submit"
                              className="bg-[#269EB2] text-white px-4 py-2 rounded-lg mr-4"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}

                  {activeTab === "account" && (
                    <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                      <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 cursor">
                        <form onSubmit={handleAccountSubmit}>
                          <div className="flex justify-between flex-wrap">
                            <div className="w-60 mt-4">
                              <label>Full Name</label>
                              <input
                                type="text"
                                name="fullName"
                                value={accountData.fullName}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-60 mt-4">
                              <label>Photo</label>
                              <input
                                type="file"
                                name="photo"
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-60 mt-4">
                              <label>Gender</label>
                              <select
                                name="gender"
                                value={accountData.gender}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>

                            <div className="w-60 mt-4">
                              <label>Date of Birth</label>
                              <input
                                type="date"
                                name="dob"
                                value={accountData.dob}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-60 mt-4">
                              <label>Contact No.</label>
                              <input
                                type="tel"
                                name="contactNo"
                                value={accountData.contactNo}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-60 mt-4">
                              <label>Passout Year</label>
                              <input
                                type="number"
                                name="passoutYear"
                                value={accountData.passoutYear}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-60 mt-4">
                              <label>Degree Program</label>
                              <input
                                type="text"
                                name="degreeProgram"
                                value={accountData.degreeProgram}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-60 mt-4">
                              <label>Occupation</label>
                              <input
                                type="text"
                                name="occupation"
                                value={accountData.occupation}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-60 mt-4">
                              <label>Professional headline</label>
                              <input
                                type="text"
                                name="headline"
                                value={accountData.headline}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-60 mt-4">
                              <label>Region</label>
                              <input
                                type="text"
                                name="region"
                                value={accountData.region}
                                onChange={handleAccountChange}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="mt-6 bg-[#269EB2] text-white py-2 px-4 rounded-lg"
                          >
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {activeTab === "changepassword" && (
                    <form onSubmit={handleProfileSubmit}>
                      <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 space-y-2.5">
                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="currentpass">
                            Current Password
                          </Label>
                          <Input
                            id="currentpass"
                            className="h-10 w-1/2"
                            placeholder=""
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="newpass">
                            New Password
                          </Label>
                          <Input
                            id="newpass"
                            className="h-10 w-1/2"
                            placeholder=""
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="confirmpass">
                            Confirm Password
                          </Label>
                          <Input
                            id="confirmpass"
                            className="h-10 w-1/2"
                            placeholder=""
                          />
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="bg-[#269EB2] text-white px-4 py-2 rounded-lg mr-4 mt-6"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
