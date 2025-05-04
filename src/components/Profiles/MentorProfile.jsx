import React from "react";
import "./MentorProfile.css";

const MentorProfile = () => {
  const profile = {
    name: "Sarah Johnson",
    title: "Class of 2023, Computer Science Major",
    profilePicture: "/assets/profile.jpg",
    academicSummary:
      "Final year Computer Science student with a focus on Artificial Intelligence and Machine Learning. Dean's List recipient for three consecutive semesters. Actively seeking opportunities in software development and data science fields.",
    academicTimeline: [
      {
        degree: "Bachelor of Science in Computer Science",
        university: "University of Technology",
        period: "2020 – 2023",
        gpa: "GPA: 3.8/4.0 | Major GPA: 3.9/4.0",
      },
      {
        company: "InnovateCo",
        role: "Product Manager",
        period: "2017 – 2020",
        description: "Managed mobile app development team",
      },
    ],
    skills: ["Python", "Java", "Machine Learning", "Web Development", "SQL"],
    mentorship: {
      seeking: true,
      interests: "Software Development, AI/ML Career Guidance",
    },
    achievements: [
      { title: "Dean's List 2022–2023", icon: "🏅" },
      { title: "1st Place – University Hackathon", icon: "🥇" },
      { title: "Outstanding Project Award", icon: "🏆" },
    ],
  };

  return (
    <div className="mentor-profile-container">
      <aside className="sidebar">
        <div className="logo">AluminiWave</div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Events</li>
            <li>Mentorship</li>
            <li>Job Portal</li>
            <li>Networking</li>
          </ul>
          <div className="account-section">
            <span>MY ACCOUNT</span>
            <ul>
              <li className="active">Profile</li>
              <li>Settings</li>
            </ul>
          </div>
        </nav>
      </aside>

      <main className="profile-main">
        <section className="profile-header">
          <div className="profile-banner" />
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.title}</p>
          </div>
        </section>

        <section className="profile-content">
          <div className="main-content">
            <div className="profile-card">
              <h3>Academic Summary</h3>
              <p>{profile.academicSummary}</p>
            </div>

            <div className="profile-card">
              <h3>Academic Timeline</h3>
              <ul className="timeline-list">
                <li>
                  <strong>{profile.academicTimeline[0].degree}</strong>
                  <div>{profile.academicTimeline[0].university}</div>
                  <div className="period">
                    {profile.academicTimeline[0].period}
                  </div>
                  <div className="gpa">{profile.academicTimeline[0].gpa}</div>
                </li>
                <li>
                  <strong>{profile.academicTimeline[1].company}</strong>
                  <div>{profile.academicTimeline[1].role}</div>
                  <div className="period">
                    {profile.academicTimeline[1].period}
                  </div>
                  <div className="desc">
                    {profile.academicTimeline[1].description}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="side-content">
            <div className="profile-card">
              <h3>Technical Skills</h3>
              <div className="skills-list">
                {profile.skills.map((skill, idx) => (
                  <span className="skill-tag" key={idx}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="profile-card">
              <h3>Mentorship Preferences</h3>
              <div className="mentorship-status seeking">
                {profile.mentorship.seeking
                  ? "Seeking Mentorship"
                  : "Mentoring"}
              </div>
              <div className="mentorship-interests">
                Interested in: {profile.mentorship.interests}
              </div>
              <button className="request-btn">Request Mentor</button>
            </div>

            <div className="profile-card">
              <h3>Academic Achievements</h3>
              <ul className="achievements-list">
                {profile.achievements.map((ach, idx) => (
                  <li key={idx}>
                    <span className="achievement-icon">{ach.icon}</span>
                    {ach.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MentorProfile;
