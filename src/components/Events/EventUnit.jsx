import mdp from "../../assets/mdp.jpg";
import Saradp from "../../assets/sara.png";
import Event1 from "../../assets/Tech-Events1.jpg";
import Event2 from "../../assets/Tech-Events2.jpg";

const EventUnit = () => {
  return (
    <div>
      <div class="mt-14">
        <h1 class="text-5xl font-bold mx-52 mb-10">Events</h1>
        <div class="bg-white rounded-lg shadow p-6 mb-6 mx-48">
          <div class="relative h-64 mb-6">
            <img
              src={Event2}
              class="w-full h-full object-cover rounded-lg"
              alt="Event Banner"
            />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h1 class="text-3xl font-bold mb-2">Alumni Networking Night</h1>
              <div class="flex items-center space-x-4">
                <span>
                  <i class="far fa-calendar mr-2"></i>Jun 15, 2024
                </span>
                <span>
                  <i class="fas fa-map-marker-alt mr-2"></i>San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-5">Event Description</h2>
              <div class="space-y-3 p-4 bg-gray-50 rounded-lg mb-5">
                <span class="font-medium w-24 ">
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
              <h2 class="text-xl font-semibold mb-5">Featured Speakers</h2>
              <div class="flex gap-10">
                <div class="text-center">
                  <img
                    src={Saradp}
                    class="w-20 h-20 rounded-full mx-auto mb-2"
                    alt="Speaker 1"
                  />
                  <h3 class="font-medium">Sarah Johnson</h3>
                  <p class="text-sm text-gray-600">CEO, Tech Corp</p>
                </div>
                <div class="text-center">
                  <img
                    src={mdp}
                    class="w-20 h-20 rounded-full mx-auto mb-2"
                    alt="Speaker 2"
                  />
                  <h3 class="font-medium">Michael Chen</h3>
                  <p class="text-sm text-gray-600">VP Engineering</p>
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
