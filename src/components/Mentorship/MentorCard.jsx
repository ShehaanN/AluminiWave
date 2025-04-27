import "./MentorCard.css";

export default function MentorCard({
  name,
  matchPercent,
  expertise,
  onProfileClick,
}) {
  return (
    <div className="mentor-card">
      <div className="mentor-top">
        <div className="mentor-avatar" />
        <div className="mentor-info">
          <div className="mentor-name">{name}</div>
          <div className="mentor-match">{matchPercent}% Match</div>
        </div>
      </div>
      <div className="mentor-tags">
        {expertise.map((tag, index) => (
          <span key={index} className="mentor-tag">
            {tag}
          </span>
        ))}
      </div>
      <button className="mentor-button" onClick={onProfileClick}>
        View Profile
      </button>
    </div>
  );
}

import SessionScheduler from "../Mentorship/SessionScheduler";

// Example dummy session
const session = {
  date: "April 25, 2025",
  time: "3:00 PM",
  mentor: "Jane Smith",
};

export function Mentorship() {
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
  return (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: "300px" }}>
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

      <div style={{ flex: 1, minWidth: "300px" }}>
        <SessionScheduler
          nextSession={session}
          onScheduleClick={() => alert("Redirect to scheduling page")}
        />
      </div>
    </div>
  );
}
