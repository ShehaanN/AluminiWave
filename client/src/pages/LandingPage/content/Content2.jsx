import careerIcon from "../../../assets/career.png";
import collabIcon from "../../../assets/collab.png";
import jobIcon from "../../../assets/job.png";
function ValuePropositions() {
  return (
    <div className="ValuePropositions">
      {" "}
      <div className="features">
        <section className="py-16 bg-white text-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Everything you need to succeed
            </h2>
          </div>

          <div className="max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
            {/* Card 1 */}
            <div className="flex flex-row items-start text-start gap-4">
              <div className="bg-[#269EB2] p-3 rounded-md mb-4 mt-2 ">
                <img src={collabIcon} alt="" className="w-12 h-4" />
              </div>
              <div className="">
                <h3 className="font-semibold text-sm mb-2">
                  Personalized Mentorship Matching
                </h3>
                <p className="text-gray-500 text-sm">
                  Find the perfect mentor with our AI-powered compatibility
                  system,connecting you with professionals who understand your
                  journey.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-row items-start text-start gap-4">
              <div className="bg-[#269EB2] p-3 rounded-md mb-4 mt-2">
                <img src={careerIcon} alt="" className="w-12 h-4" />
              </div>
              <div className="">
                <h3 className="font-semibold text-sm mb-2">
                  Career-Building Events
                </h3>
                <p className="text-gray-500 text-sm">
                  Discover industry-specific networking sessions, workshops, and
                  conferences designed to expand your professional horizons.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-row items-start text-start gap-4">
              <div className="bg-[#269EB2] p-3 rounded-md mb-4 mt-2 ">
                <img src={jobIcon} alt="" className="w-12 h-4" />
              </div>
              <div className="">
                <h3 className="font-semibold text-sm mb-2">
                  Exclusive Job Opportunities
                </h3>
                <p className="text-gray-500 text-sm">
                  Access positions shared directly by fellow alumni and trusted
                  partners, with application tracking and preparation resources.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full">
          {/* Stats Section */}
          <div className="bg-[#269EB2] text-white py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-sm mt-2">Active Mentorships</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-sm mt-2">Alumni Members</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">10+</h3>
              <p className="text-sm mt-2">Events Hosted</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">90%</h3>
              <p className="text-sm mt-2">Success Rate</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16 px-4 bg-white">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Join the AluminiWave Community Today
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Create your profile in minutes and start building meaningful
              professional connections that last a lifetime.
            </p>
            <a href="/register">
              {" "}
              <button className="mt-6 bg-[#269EB2] text-white font-medium px-6 py-3 rounded hover:bg-[#269EB2] transition">
                Create your profile →
              </button>
            </a>
          </div>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-400 py-24 text-center text-sm">
            <hr className="border-gray-700 mb-4 w-11/12 mx-auto" />© 2025
            AluminiWave. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ValuePropositions;
