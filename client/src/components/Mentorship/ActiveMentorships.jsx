import { Link } from "react-router-dom";
import sara from "../../assets/sara.png";
import mdp from "../../assets/mdp.jpg";
import { Timer } from "lucide-react";

const ActiveMentorships = () => {
  return (
    <div className="min-h-screen flex ">
      <main className="flex-1  px-32 py-4 bg-purple-50">
        <div className="p-6">
          <div className="flex justify-end items-center mb-6">
            {/* <h1 className="text-3xl font-bold">Mentors</h1> */}
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
                  <h2 className="text-xl font-semibold">Active Mentorships</h2>
                </div>
                <div className="flex flex-col space-y-6">
                  {/* card 1 */}
                  <div className=" bg-gray-100 rounded-lg shadow p-6">
                    <div className="flex flex-row justify-between">
                      <div className="w-10/12">
                        <div className="flex items-center ">
                          <div className=" mb-4 mr-3">
                            <img
                              src={sara}
                              className="w-12 h-12 rounded-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              Dr. Sarah Johnson
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              Senior ML Engineer at Google
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-700 mb-4">
                          <i class="fa-solid fa-calendar mr-3"></i>June 25, 2025
                        </div>
                        <div className="flex items-center text-sm text-gray-700 mb-4">
                          <Timer className="mr-2 size-4.5 text-gray-800" />
                          8:00 PM
                        </div>
                        <div className="flex items-start mb-4">
                          <i class="fa-regular fa-message mr-2 mt-1"></i>
                          <p className="text-gray-700 text-sm ">
                            Senior ML Engineer at Google Lorem ipsum dolor sit
                            amet, consectetur adipisicing elit. Nulla optio
                            molestias accusantium enim, asperiores dolorum.
                            Excepturi amet nisi error sequi doloribus?
                            Aspernatur possimus, porro consequuntur veniam quia
                            hic cupiditate fuga! Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Dignissimos quo veniam
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aspernatur possimus alias, ipsam vel rerum eum
                            quisquam accusantium ad unde dolores explicabo
                            quibusdam fugiat nobis exercitationem minus esse.
                            Maiores, quo harum! reprehenderit, pariatur maxime
                            nulla a reiciendis iste officia animi error omnis ex
                            quod aut, harum sint! Facere, impedit. Doloribus.
                          </p>
                        </div>
                      </div>
                      <div>
                        <button className=" px-5 bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                          Join Meeting
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* --- */}
                  {/* card 1 */}
                  <div className=" bg-gray-100 rounded-lg shadow p-6">
                    <div className="flex flex-row justify-between">
                      <div className="w-10/12">
                        <div className="flex items-center ">
                          <div className=" mb-4 mr-3">
                            <img src={mdp} className="w-12 h-12 rounded-full" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              Dr. Sarah Johnson
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              Senior ML Engineer at Google
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-700 mb-4">
                          <i class="fa-solid fa-calendar mr-3"></i>June 25, 2025
                        </div>
                        <div className="flex items-center text-sm text-gray-700 mb-4">
                          <Timer className="mr-2 size-4.5 text-gray-800" />
                          8:00 PM
                        </div>
                        <div className="flex items-start mb-4">
                          <i class="fa-regular fa-message mr-2 mt-1"></i>
                          <p className="text-gray-700 text-sm ">
                            Senior ML Engineer at Google Lorem ipsum dolor sit
                            amet, consectetur adipisicing elit. Nulla optio
                            molestias accusantium enim, asperiores dolorum.
                            Excepturi amet nisi error sequi doloribus?
                            Aspernatur possimus, porro consequuntur veniam quia
                            hic cupiditate fuga! Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Dignissimos quo veniam
                          </p>
                        </div>
                      </div>
                      <div>
                        <button className=" px-5 bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                          Join Meeting
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* --- */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActiveMentorships;
