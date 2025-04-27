import { Link } from "react-router-dom";
import mdp from "../../assets/mdp.jpg";
import Saradp from "../../assets/sara.png";
import Event1 from "../../assets/Tech-Events1.jpg";
import Event2 from "../../assets/Tech-Events2.jpg";

const EventUnit = () => {
  return (
    <div>
      <div className="bg-purple-50 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-bold mx-52 mb-10 ">Events</h1>
          <div className="mr-56">
            <Link to="/events">
              <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                <i class="fa-solid fa-backward mr-2"></i>Back
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-6 mx-48">
          <div className="relative h-64 mb-6">
            <img
              src={Event2}
              className="w-full h-full object-cover rounded-lg"
              alt="Event Banner"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">
                Alumni Networking Night
              </h1>
              <div className="flex items-center space-x-4">
                <span>
                  <i className="far fa-calendar mr-2"></i>Jun 15, 2024
                </span>
                <span>
                  <i className="fas fa-map-marker-alt mr-2"></i>San Francisco,
                  CA
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-5">Event Description</h2>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg mb-5">
                <span className="font-medium w-24 ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Blanditiis temporibus eius commodi maxime voluptatum libero
                  placeat! Sequi error neque ea quisquam voluptatem inventore
                  veritatis, id obcaecati fuga necessitatibus atque nobis. Lorem
                  ipsum dolor sit, amet consectetur adipisicing elit. Iure
                  aliquid temporibus quod earum repudiandae magnam neque nostrum
                  totam nulla illum, autem veritatis ullam doloremque quibusdam
                  velit maiores quidem quis dolor.
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-5">Featured Speakers</h2>
              <div className="flex gap-10">
                <div className="text-center">
                  <img
                    src={Saradp}
                    className="w-20 h-20 rounded-full mx-auto mb-2"
                    alt="Speaker 1"
                  />
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <p className="text-sm text-gray-600">CEO, Tech Corp</p>
                </div>
                <div className="text-center">
                  <img
                    src={mdp}
                    className="w-20 h-20 rounded-full mx-auto mb-2"
                    alt="Speaker 2"
                  />
                  <h3 className="font-medium">Michael Chen</h3>
                  <p className="text-sm text-gray-600">VP Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventUnit;
