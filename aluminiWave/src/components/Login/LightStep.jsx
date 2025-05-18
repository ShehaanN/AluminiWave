import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import './LightStep.css';
import Loginstep from './Loginstep';
import { useNavigate } from 'react-router-dom';

function LightStep() {
  const navigate2 = useNavigate();

  // State for industries of interest
  const [industries, setIndustries] = useState({
    Technology: false,
    Business: false,
    Engineering: false,
    'Arts & Design': false,
    Healthcare: false,
    Education: false,
  });

  // State for skills input and tags
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['Leadership', 'Public Speaking', 'Project Management']);

  // State for career stage
  const [careerStage, setCareerStage] = useState('Current Student');

  // State for mentorship preferences
  const [mentorshipPrefs, setMentorshipPrefs] = useState({
    mentor: false,
    lookingForMentor: false,
    groupSessions: false,
  });

  // State for areas of expertise/interest
  const [areasOfExpertise, setAreasOfExpertise] = useState('');

  // State for preferred communication methods
  const [commMethods, setCommMethods] = useState({
    virtualMeetings: true,
    inPersonMeetings: false,
    email: true,
    chat: false,
  });

  // Handlers
  const toggleIndustry = (industry) => {
    setIndustries(prev => ({ ...prev, [industry]: !prev[industry] }));
  };

  const toggleMentorshipPref = (pref) => {
    setMentorshipPrefs(prev => ({ ...prev, [pref]: !prev[pref] }));
  };

  const toggleCommMethod = (method) => {
    setCommMethods(prev => ({ ...prev, [method]: !prev[method] }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };

  // Save & Register handler
  const handleSave = async () => {
    const selectedIndustries = Object.keys(industries).filter(key => industries[key]);
    const dataToSend = {
      industries: selectedIndustries,
      skills,
      careerStage,
      mentorshipPrefs,
      areasOfExpertise,
      commMethods,
    };

    try {
      const res = await fetch('http://localhost:5000/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (res.ok) {
        navigate2('/SignupStep3');
      } else {
        alert('Error saving career info');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div>
      <div className="header">
        <img src={logo} alt="Logo" />
        <div className="headerTopic">
          <h1>Join Our Alumni Network</h1>
          <p>Connect, Share, and Grow with Fellow Graduates</p>
        </div>
      </div>
      <div className="ligtForm">
        <div className="form-container">
          <Loginstep />
          <h3>Career Interests & Expertise</h3>

          <div className="section">
            <label className="section-label">Select Your Industries of Interest (Multiple)</label>
            <div className="industries-grid">
              {Object.keys(industries).map(ind => (
                <label key={ind}>
                  <input
                    type="checkbox"
                    checked={industries[ind]}
                    onChange={() => toggleIndustry(ind)}
                  /> {ind}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <label className="section-label">Skills & Expertise</label>
            <input
              className="skills-input"
              type="text"
              placeholder="Type a skill (e.g., Leadership, Marketing, Data Analysis…)"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
            />
            <div className="skills-tags">
              {skills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="section">
            <label className="section-label">Career Stage</label>
            <select value={careerStage} onChange={e => setCareerStage(e.target.value)}>
              <option>Current Student</option>
              <option>Recent Graduate</option>
              <option>Professional</option>
            </select>
          </div>

          <div className="section mentorship-group">
            <label className="section-label">Mentorship Preferences</label><br />
            <label><input type="checkbox" checked={mentorshipPrefs.mentor} onChange={() => toggleMentorshipPref('mentor')} /> I want to be a mentor</label><br />
            <label><input type="checkbox" checked={mentorshipPrefs.lookingForMentor} onChange={() => toggleMentorshipPref('lookingForMentor')} /> I'm looking for a mentor</label><br />
            <label><input type="checkbox" checked={mentorshipPrefs.groupSessions} onChange={() => toggleMentorshipPref('groupSessions')} /> Interested in group mentoring sessions</label>
          </div>

          <div className="section">
            <label className="section-label">Areas of Expertise/Interest</label>
            <textarea
              placeholder="Share your specific areas of expertise or topics you’d like to learn about from mentors…"
              value={areasOfExpertise}
              onChange={e => setAreasOfExpertise(e.target.value)}
            ></textarea>
          </div>

          <div className="section">
            <label className="section-label">Preferred Communication Methods</label>
            <div className="communication-methods">
              <button
                type="button"
                className={`comm-btn ${commMethods.virtualMeetings ? 'selected' : ''}`}
                onClick={() => toggleCommMethod('virtualMeetings')}
              >
                Virtual Meetings
              </button>
              <button
                type="button"
                className={`comm-btn ${commMethods.inPersonMeetings ? 'selected' : ''}`}
                onClick={() => toggleCommMethod('inPersonMeetings')}
              >
                In-person Meetings
              </button>
            </div>
            <div className="communication-methods">
              <button
                type="button"
                className={`comm-btn ${commMethods.email ? 'selected' : ''}`}
                onClick={() => toggleCommMethod('email')}
              >
                Email
              </button>
              <button
                type="button"
                className={`comm-btn ${commMethods.chat ? 'selected' : ''}`}
                onClick={() => toggleCommMethod('chat')}
              >
                Chat
              </button>
            </div>
          </div>

          <button className="save-btn" onClick={handleSave}>Save & Register</button>
        </div>
      </div>
    </div>
  );
}

export default LightStep;
