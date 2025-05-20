import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SuperSettings = () => {
  const [activeTab, setActiveTab] = useState("account");

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

                <Link to="/superdashboard">
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
                  {activeTab === "account" && (
                    <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                      <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 cursor">
                        <form onSubmit="">
                          <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 space-y-2.5">
                            <div className="flex flex-col space-y-1.5">
                              <Label
                                className="text-md mb-1"
                                htmlFor="adminname"
                              >
                                Name
                              </Label>
                              <Input
                                id="adminname"
                                className="h-10 w-1/2"
                                placeholder=""
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label className="text-md mb-1" htmlFor="email">
                                Email
                              </Label>
                              <Input
                                id="email"
                                className="h-10 w-1/2"
                                placeholder=""
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label
                                className="text-md mb-1"
                                htmlFor="contactno"
                              >
                                Contact No
                              </Label>
                              <Input
                                id="contactno"
                                className="h-10 w-1/2"
                                placeholder=""
                              />
                            </div>

                            <div>
                              <button
                                type="submit"
                                className="bg-[#269EB2] text-white px-4 py-2 rounded-lg mr-4 mt-6"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {activeTab === "changepassword" && (
                    <form onSubmit="">
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

export default SuperSettings;
