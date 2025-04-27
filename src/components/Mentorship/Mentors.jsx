import { Link } from "react-router-dom";
import sara from "../../assets/sara.png";
import mdp from "../../assets/mdp.jpg";

const Mentors = () => {
  return (
    <div className="min-h-screen flex ">
      <main className="flex-1  px-32 py-4 bg-purple-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Mentors</h1>
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
                  <h2 className="text-xl font-semibold">Mentor List</h2>
                </div>
                <div className="grid grid-cols-4  gap-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={sara} className="w-12 h-12 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior ML Engineer at Google
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>15 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Machine Learning
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Leadership
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={sara} className="w-12 h-12 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior ML Engineer at Google
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>15 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Machine Learning
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Leadership
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={sara} className="w-12 h-12 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior ML Engineer at Google
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>15 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Machine Learning
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Leadership
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={sara} className="w-12 h-12 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior ML Engineer at Google
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>15 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Machine Learning
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Leadership
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={sara} className="w-12 h-12 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior ML Engineer at Google
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>15 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Machine Learning
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Leadership
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={mdp} className="w-12 h-12 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">Michael Chen</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior Project Manager at Alibaba
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>10 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Product Strategy
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Startup
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={sara} className="w-12 h-12 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">Emma Williams</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Head Marketing Officer at Telecom
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>12 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Digital Marketing
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Strategy
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={mdp} className="w-12 h-12 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">David Kumar</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior Cloud Engineer at Microsoft
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>8 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Cloud Computing
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        DevOps
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
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

export default Mentors;
