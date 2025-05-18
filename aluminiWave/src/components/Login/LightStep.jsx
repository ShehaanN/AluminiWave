import React from 'react'
import logo from '../../assets/logo.png'
import './LightStep.css'
import Loginstep from './Loginstep'

function LightStep() {
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
    <div className="industries-group">
      <label><input type="checkbox" /> Technology</label>
      <label><input type="checkbox" /> Business</label>
      <label><input type="checkbox" /> Engineering</label>
      <label><input type="checkbox" /> Arts & Design</label>
      <label><input type="checkbox" /> Healthcare</label>
      <label><input type="checkbox" /> Education</label>
    </div>
  </div>
  
  <div className="section">
    <label className="section-label">Skills & Expertise</label>
    <input className="skills-input" type="text" placeholder="Type a skill (e.g., Leadership, Marketing, Data Analysis…)" />
    <div className="skills-tags">
      <span className="skill-tag">Leadership</span>
      <span className="skill-tag">Public Speaking</span>
      <span className="skill-tag">Project Management</span>
    </div>
  </div>
  
  <div className="section">
    <label className="section-label">Career Stage</label>
    <select>
      <option>Current Student</option>
      <option>Recent Graduate</option>
      <option>Professional</option>
    </select>
  </div>
  
  <div className="section mentorship-group">
    <label className="section-label">Mentorship Preferences</label>
    <label><input type="checkbox" /> I want to be a mentor</label>
    <label><input type="checkbox" /> I'm looking for a mentor</label>
    <label><input type="checkbox" /> Interested in group mentoring sessions</label>
  </div>
  
  <div className="section">
    <label className="section-label">Areas of Expertise/Interest</label>
    <textarea placeholder="Share your specific areas of expertise or topics you’d like to learn about from mentors…"></textarea>
  </div>
  
  <div className="section">
    <label className="section-label">Preferred Communication Methods</label>
    <div className="communication-methods">
      <button type="button" className="comm-btn selected">Virtual Meetings</button>
      <button type="button" className="comm-btn">In-person Meetings</button>
    </div>
    <div className="communication-methods">
      <button type="button" className="comm-btn selected">Email</button>
      <button type="button" className="comm-btn">Chat</button>
    </div>
  </div>
  
  <button className="save-btn">Save & Register</button>
</div>
            </div>
    </div>
  )
}

export default LightStep
