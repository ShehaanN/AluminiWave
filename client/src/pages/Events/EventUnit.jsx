import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEventById } from "../../services/dataService";

import Event1 from "../../assets/Tech-Events1.jpg";
import Saradp from "../../assets/sara.png";

const EventUnit = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        const eventData = await fetchEventById(id);
        if (eventData) {
          setEvent(eventData);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEventDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div>
      <div className="bg-purple-50 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-bold mx-52 mb-10 ">Events</h1>
          <div className="mr-56">
            <Link to="/events">
              <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                <i className="fa-solid fa-backward mr-2"></i>Back
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-6 mx-48">
          <div className="relative h-64 mb-6">
            <img
              src={event.banner_image_url || Event1}
              className="w-full h-full object-cover rounded-lg"
              alt="Event Banner"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4">
                <span>
                  <i className="far fa-calendar mr-2"></i>
                  {new Date(event.event_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {event.location}
                </span>
                {event.time_slot_start && (
                  <span>
                    <i className="far fa-clock mr-2"></i>
                    {event.time_slot_start}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-5">Event Description</h2>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg mb-5">
                <span className="font-medium w-24">{event.description}</span>
              </div>
            </div>
            {/* ...............................................*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventUnit;
