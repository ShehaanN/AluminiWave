import Event1 from "../../assets/Tech-Events1.jpg";
import Event2 from "../../assets/Tech-Events2.jpg";
import { Link } from "react-router-dom";
import sara from "../../assets/sara.png";
import mdp from "../../assets/mdp.jpg";

const StuRequests = () => {
  return (
    <div className="min-h-screen flex ">
      <main className="flex-1  px-32 py-4 bg-purple-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Requests for Mentorship</h1>
            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
              <Link to="/mentorship">
                <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                  <i class="fa-solid fa-backward mr-2"></i>Back
                </button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div className="col-span-2">
              <div className="bg-white min-h-screen rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Request List</h2>
                </div>
                <div className="grid grid-cols-4  gap-8">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow">
                    <div className="flex items-center mb-4">
                      <img
                        src={mdp}
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
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow">
                    <div className="flex items-center mb-4">
                      <img
                        src={sara}
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
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow">
                    <div className="flex items-center mb-4">
                      <img
                        src={mdp}
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
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow">
                    <div className="flex items-center mb-4">
                      <img
                        src={sara}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StuRequests;
