import Sidebar from "../Sidebar/Sidebar";
import Event1 from "../../assets/Tech-Events1.jpg";
import eb from "../../assets/EventBanner.png";
import Event2 from "../../assets/Tech-Events2.jpg";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { getUserData, fetchEvents } from "../../services/dataService";

const Events = () => {
  const [userType, setUserType] = useState("");
  const [events, setEvents] = useState([]);
  const [test, setTest] = useState();
  console.log(test);

  console.log(events);

  // console.log(userType);

  useEffect(() => {
    const loadData = async () => {
      const userData = await getUserData();
      if (userData) {
        setTest(userData);
        setUserType(userData.profile.role);
      }

      const events = await fetchEvents();
      if (events) {
        setEvents(events);
      }
      // Handle events data
    };

    loadData();
  }, []);

  // const userType = "student";

  return (
    <div className="min-h-screen flex ">
      <Sidebar userType={userType} />
      <main className="flex-1 md:ml-64 ml-0 px-8 py-4 bg-gray-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Event Management</h1>
            {userType === "alumni" && (
              <div className="flex flex-wrap space-x-4  ">
                <Link to="/manageevent">
                  <button className="px-4 py-2 bg-[#7a999e] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i className="fas fa-cog mr-2"></i>Manage
                  </button>
                </Link>
                <Link to="/createevent">
                  <button className="px-4 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i className="fas fa-plus mr-2"></i>Create Event
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div className="col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Upcoming Events</h2>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                  {/* -------------------- */}

                  {events.map((el, index) => {
                    return (
                      <div
                        key={index}
                        id="e1"
                        className="border rounded-lg p-4"
                      >
                        <Link to={`/events/${el.id}`}>
                          <img
                            src={el.banner_image_url ? el.banner_image_url : eb}
                            className="w-full h-48 object-cover rounded mb-4"
                          />
                        </Link>
                        <h3 className="font-semibold mb-2">{el.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          <i className="far fa-calendar mr-2"></i>
                          {el.event_date}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <i className="fas fa-map-marker-alt mr-2"></i>
                          {el.location}
                        </p>
                      </div>
                    );
                  })}
                  {/* --------------------- */}
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
