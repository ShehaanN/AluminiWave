import logo from "../../assets/logo.png";

const Sidebar = ({ type }) => {
  return (
    <div>
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <img src={logo} alt="AlumniWave" className="w-full h-2/3 " />
        </div>
        <nav className="mt-6">
          <a
            href="/dashboard"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 "
          >
            <i className="fas fa-chart-line w-5  "></i>

            <span className="ml-3 ">Dashboard</span>
          </a>
          <a
            href="/events"
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

          {type === "Alumini" ? (
            <a
              href="/JobPortal"
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 "
            >
              <i className="fas fa-briefcase w-5"></i>
              <span className="ml-3">Job Portal</span>
            </a>
          ) : (
            <a
              href="#"
              className="items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hidden"
            >
              <i className="fas fa-briefcase w-5"></i>
              <span className="ml-3">Job Portal</span>
            </a>
          )}

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
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
