import MentorCard from "./MentorCard";
import SessionScheduler from "./SessionScheduler";
import ActiveMentorshipCard from "./ActiveMentorshipCard";
import "./Mentorship.css";

const dummyMentors = [
  {
    name: "Jane Smith",
    matchPercent: 94,
    expertise: ["AI", "Career Guidance", "Project Planning"],
  },
  {
    name: "Michael Johnson",
    matchPercent: 89,
    expertise: ["Web Development", "Internships", "React"],
  },
];

const nextSession = {
  date: "April 25, 2025",
  time: "3:00 PM",
  mentor: "Jane Smith",
};

export default function Mentorship() {
  return (
    <div className="mentorship-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Dashboard</li>
          <li>Mentorship</li>
          <li>Events</li>
          <li>Messages</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1 className="page-title">Mentorship</h1>

        <div className="content-section">
          {/* Mentor Cards */}
          <div className="mentor-grid">
            {dummyMentors.map((mentor, i) => (
              <MentorCard
                key={i}
                name={mentor.name}
                matchPercent={mentor.matchPercent}
                expertise={mentor.expertise}
                onProfileClick={() => alert(`Viewing ${mentor.name}`)}
              />
            ))}
          </div>

          {/* Right section with session + active mentorship */}
          <div className="right-panel">
            <SessionScheduler
              nextSession={nextSession}
              onScheduleClick={() => alert("Go to scheduling page")}
            />

            <ActiveMentorshipCard
              mentee="You"
              mentor="Jane Smith"
              goal="Improve project leadership skills"
              current={3}
              total={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
