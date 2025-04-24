import logo from "../../assets/logo.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <img src={logo} alt="AlumniWave" className="w-full h-2/3 " />
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className="flex items-center px-6 py-3 text-custom bg-purple-50"
          >
            <i
              className="fas fa-chart-line w-5 fill-current"
              style={{ color: "var(--color-aluwave)" }}
            ></i>

            <span className="ml-3 " style={{ color: "var(--color-aluwave)" }}>
              Dashboard
            </span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <i className="fas fa-calendar w-5"></i>
            <span className="ml-3">Events</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <i className="fas fa-users w-5"></i>
            <span className="ml-3">Mentorship</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <i className="fas fa-briefcase w-5"></i>
            <span className="ml-3">Job Portal</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <i className="fas fa-network-wired w-5"></i>
            <span className="ml-3">Networking</span>
          </a>
          <div className="px-6 py-4 mt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase">
              My Account
            </p>
          </div>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <i className="fas fa-user w-5"></i>
            <span className="ml-3">Profile</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <i className="fas fa-award w-5"></i>
            <span className="ml-3">Achievements</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50"
          >
            <i className="fas fa-cog w-5"></i>
            <span className="ml-3">Settings</span>
          </a>
        </nav>
      </aside>

      <main className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Alex!
            </h1>
            <p className="text-gray-600 mt-1">Your alumni dashboard</p>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i
                    className="fas fa-calendar text-custom fill-current"
                    style={{ color: "var(--color-aluwave)" }}
                  ></i>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">UPCOMING</h3>
              <p className="text-lg font-bold mt-1">Tech Career Fair</p>
              <p className="text-sm text-gray-600 mt-1">
                Connect with top employers in the tech industry, May 15, 2023
              </p>
              <div className="mt-4 flex gap-3">
                <button className="!rounded-button bg-custom text-white px-4 py-2 text-sm font-medium">
                  Register
                </button>
                <button className="!rounded-button border border-gray-200 text-gray-700 px-4 py-2 text-sm font-medium">
                  Details
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-custom"></i>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">MENTORSHIP</h3>
              <p className="text-lg font-bold mt-1">3 Pending Requests</p>
              <p className="text-sm text-gray-600 mt-1">
                Students seeking guidance in software development and data
                science
              </p>
              <div className="mt-4 flex gap-3">
                <button className="!rounded-button bg-custom text-white px-4 py-2 text-sm font-medium">
                  Review
                </button>
                <button className="!rounded-button border border-gray-200 text-gray-700 px-4 py-2 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-briefcase text-custom"></i>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">JOBS</h3>
              <p className="text-lg font-bold mt-1">5 New Opportunities</p>
              <p className="text-sm text-gray-600 mt-1">
                New job postings matching your profile in the last week
              </p>
              <div className="mt-4 flex gap-3">
                <button className="!rounded-button bg-custom text-white px-4 py-2 text-sm font-medium">
                  Explore
                </button>
                <button className="!rounded-button border border-gray-200 text-gray-700 px-4 py-2 text-sm font-medium">
                  Job Board
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Upcoming Events
              </h2>
              <div className="flex gap-4 border-b border-gray-200">
                <button className="px-4 py-2 text-custom border-b-2 border-custom font-medium">
                  All Events
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  Career Fairs
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  Networking
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  Workshops
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-calendar text-custom"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        Tech Career Fair
                      </h4>
                      <p className="text-sm text-gray-500">
                        May 15, 2023 • Virtual Event
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-users text-custom"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        Alumni Networking Mixer
                      </h4>
                      <p className="text-sm text-gray-500">
                        June 2, 2023 • Campus Center
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-alt text-custom"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        Resume Workshop
                      </h4>
                      <p className="text-sm text-gray-500">
                        June 10, 2023 • Online
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <button className="!rounded-button w-full bg-custom text-white py-2 font-medium">
                  View All Events
                </button>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Mentorship Activity
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <img
                    src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a young Asian woman in business attire with a friendly smile against a neutral background&width=40&height=40&orientation=squarish&flag=4c2d2d52-7bcd-4d4d-99ec-6a52de283a21"
                    className="w-10 h-10 rounded-full"
                    alt="Sarah Chen"
                  />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Sarah Chen</h4>
                    <p className="text-sm text-gray-500">
                      Software Engineering Student
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Seeking guidance in software engineering career paths
                </p>
                <div className="flex gap-3">
                  <button className="!rounded-button flex-1 bg-custom text-white py-2 text-sm font-medium">
                    Accept
                  </button>
                  <button className="!rounded-button flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
                    View Profile
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <img
                    src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a Latino man in business casual attire with a confident expression against a neutral background&width=40&height=40&orientation=squarish&flag=3d7e6dd3-5b0b-40b8-bc43-90ea12aa2518"
                    className="w-10 h-10 rounded-full"
                    alt="Michael Rodriguez"
                  />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">
                      Michael Rodriguez
                    </h4>
                    <p className="text-sm text-gray-500">
                      Data Science Student
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Looking for advice on data science internships
                </p>
                <div className="flex gap-3">
                  <button className="!rounded-button flex-1 bg-custom text-white py-2 text-sm font-medium">
                    Accept
                  </button>
                  <button className="!rounded-button flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
                    View Profile
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border className-gray-200">
                <div className="flex items-center mb-4">
                  <img
                    src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a woman with a creative style in design industry attire with an artistic background&width=40&height=40&orientation=squarish&flag=25c73d89-c6e1-4e64-8615-fe6c23f8a67c"
                    className="w-10 h-10 rounded-full"
                    alt="Jamie Wilson"
                  />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Jamie Wilson</h4>
                    <p className="text-sm text-gray-500">
                      UX/UI Design Student
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Interested in discussing UX/UI design industry trends
                </p>
                <div className="flex gap-3">
                  <button className="!rounded-button flex-1 bg-custom text-white py-2 text-sm font-medium">
                    Accept
                  </button>
                  <button className="!rounded-button flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Career Resources
              </h2>
              <div className="divide-y divide-gray-200">
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-code text-custom"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        Senior Software Engineer
                      </h4>
                      <p className="text-sm text-gray-500">TechCorp • Remote</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      Posted 2 days ago
                    </span>
                    <button className="text-gray-400 hover:text-gray-500">
                      <i className="fas fa-bookmark"></i>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <i className="fas fa-share-alt"></i>
                    </button>
                  </div>
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-chart-bar text-custom"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        Data Scientist
                      </h4>
                      <p className="text-sm text-gray-500">
                        Analytics Inc. • New York, NY
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      Posted 3 days ago
                    </span>
                    <button className="text-gray-400 hover:text-gray-500">
                      <i className="fas fa-bookmark"></i>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <i className="fas fa-share-alt"></i>
                    </button>
                    className{" "}
                  </div>
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-paint-brush text-custom"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        UX/UI Designer
                      </h4>
                      <p className="text-sm text-gray-500">
                        Creative Solutions • San Francisco, CA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      Posted 5 days ago
                    </span>
                    <button className="text-gray-400 hover:text-gray-500">
                      <i className="fas fa-bookmark"></i>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <i className="fas fa-share-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button className="!rounded-button w-full bg-custom text-white py-2 font-medium">
                  View All Jobs
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500">BADGE</p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">
                    Mentor Star
                  </h3>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-star text-xl text-custom"></i>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Mentored 5+ students successfully
              </p>
              <button className="!rounded-button w-full border border-gray-200 text-gray-700 py-2 font-medium">
                View All Badges
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500">POINTS</p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">
                    1,250 Points
                  </h3>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-trophy text-xl text-custom"></i>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                You're in the top 10% of active alumni
              </p>
              <button className="!rounded-button w-full border border-gray-200 text-gray-700 py-2 font-medium">
                Leaderboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
