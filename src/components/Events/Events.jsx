import Sidebar from "../Sidebar/Sidebar";
import Event1 from "../../assets/Tech-Events1.jpg";
import Event2 from "../../assets/Tech-Events2.jpg";
import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div class="min-h-screen flex">
      <Sidebar type="Alumini" />
      <main class="flex-1 md:ml-64 ml-0">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Event Management</h1>
            <div class="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
              <Link to="/createevent">
                <button class="px-4 py-2 bg-custom text-white rounded-lg w-full md:w-auto min-h-[44px]">
                  <i class="fas fa-plus mr-2"></i>Create Event
                </button>
              </Link>
            </div>
          </div>

          <div class="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div class="col-span-2">
              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-semibold">Upcoming Events</h2>
                </div>
                <div class="grid md:grid-cols-3 grid-cols-1 gap-6">
                  <div id="e1" class="border rounded-lg p-4">
                    <Link to="/events/e1">
                      <img
                        src={Event2}
                        class="w-full h-48 object-cover rounded mb-4"
                      />
                    </Link>
                    <h3 class="font-semibold mb-2">Alumni Networking Night</h3>
                    <p class="text-gray-600 text-sm mb-2">
                      <i class="far fa-calendar mr-2"></i>Jun 15, 2024
                    </p>
                    <p class="text-gray-600 text-sm">
                      <i class="fas fa-map-marker-alt mr-2"></i>San Francisco,
                      CA
                    </p>
                  </div>
                  <div id="e2" class="border rounded-lg p-4">
                    <Link to="/events/e2">
                      <img
                        src={Event1}
                        class="w-full h-48 object-cover rounded mb-4"
                      />
                    </Link>
                    <h3 class="font-semibold mb-2">Alumni Networking Night</h3>
                    <p class="text-gray-600 text-sm mb-2">
                      <i class="far fa-calendar mr-2"></i>Jun 15, 2024
                    </p>
                    <p class="text-gray-600 text-sm">
                      <i class="fas fa-map-marker-alt mr-2"></i>San Francisco,
                      CA
                    </p>
                  </div>
                  <div id="e3" class="border rounded-lg p-4">
                    <img
                      src={Event2}
                      class="w-full h-48 object-cover rounded mb-4"
                    />
                    <h3 class="font-semibold mb-2">Alumni Networking Night</h3>
                    <p class="text-gray-600 text-sm mb-2">
                      <i class="far fa-calendar mr-2"></i>Jun 15, 2024
                    </p>
                    <p class="text-gray-600 text-sm">
                      <i class="fas fa-map-marker-alt mr-2"></i>San Francisco,
                      CA
                    </p>
                  </div>
                  <div id="e4" class="border rounded-lg p-4">
                    <img
                      src={Event1}
                      class="w-full h-48 object-cover rounded mb-4"
                    />
                    <h3 class="font-semibold mb-2">Alumni Networking Night</h3>
                    <p class="text-gray-600 text-sm mb-2">
                      <i class="far fa-calendar mr-2"></i>Jun 15, 2024
                    </p>
                    <p class="text-gray-600 text-sm">
                      <i class="fas fa-map-marker-alt mr-2"></i>San Francisco,
                      CA
                    </p>
                  </div>
                  <div id="e5" class="border rounded-lg p-4">
                    <img
                      src={Event2}
                      class="w-full h-48 object-cover rounded mb-4"
                    />
                    <h3 class="font-semibold mb-2">Alumni Networking Night</h3>
                    <p class="text-gray-600 text-sm mb-2">
                      <i class="far fa-calendar mr-2"></i>Jun 15, 2024
                    </p>
                    <p class="text-gray-600 text-sm">
                      <i class="fas fa-map-marker-alt mr-2"></i>San Francisco,
                      CA
                    </p>
                  </div>
                  <div id="e6" class="border rounded-lg p-4">
                    <img
                      src={Event1}
                      class="w-full h-48 object-cover rounded mb-4"
                    />
                    <h3 class="font-semibold mb-2">Tech Career Workshop</h3>
                    <p class="text-gray-600 text-sm mb-2">
                      <i class="far fa-calendar mr-2"></i>Jun 20, 2024
                    </p>
                    <p class="text-gray-600 text-sm">
                      <i class="fas fa-video mr-2"></i>Virtual Event
                    </p>
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

export default Events;
