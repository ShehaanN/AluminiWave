import React from "react";
import "./Profile.css";

const Profile = () => {
  const profile = {
    name: "Sarah Johnson",
    title: "Senior Product Manager at Tech Corp",
    profilePicture: "/assets/profile.jpg",
    summary:
      "A results-driven product manager with 8+ years of experience in tech industry. Specialized in AI/ML products and data-driven decision making. Passionate about mentoring and helping others grow in their careers.",
    experience: [
      {
        company: "Tech Corp",
        role: "Senior Product Manager",
        period: "2020 – Present",
        description: "Led development of AI-powered analytics platform",
      },
      {
        company: "InnovateCo",
        role: "Product Manager",
        period: "2017 – 2020",
        description: "Managed mobile app development team",
      },
    ],
    skills: ["Product Strategy", "AI/ML", "Data Analytics", "Team Leadership"],
    mentorship: {
      available: true,
    },
    achievements: [
      { title: "Product Excellence Award 2023", icon: "🏆" },
      { title: "Best Mobile App Design 2022", icon: "🏅" },
    ],
  };

  return (
    <div className="student-profile-container">
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
              <h3>Professional Summary</h3>
              <p>{profile.summary}</p>
            </div>

            <div className="profile-card">
              <h3>Experience Timeline</h3>
              <ul className="experience-list">
                {profile.experience.map((exp, idx) => (
                  <li key={idx}>
                    <strong>{exp.company}</strong>
                    <div>{exp.role}</div>
                    <div className="period">{exp.period}</div>
                    <div className="desc">{exp.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="side-content">
            <div className="profile-card">
              <h3>Skills & Expertise</h3>
              <div className="skills-list">
                {profile.skills.map((skill, idx) => (
                  <span className="skill-tag" key={idx}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="profile-card">
              <h3>Mentorship Status</h3>
              <div
                className={
                  profile.mentorship.available
                    ? "mentorship-status available"
                    : "mentorship-status unavailable"
                }
              >
                {profile.mentorship.available
                  ? "Available for Mentoring"
                  : "Not Available"}
              </div>
              <button className="schedule-btn">Schedule Meeting</button>
            </div>

            <div className="profile-card">
              <h3>Achievements</h3>
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

export default Profile;
