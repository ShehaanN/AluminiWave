import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import Loginstep from './Loginstep'
import ProfilePic from './ProfilePic'
import './SignupStep2.css'
import { useNavigate } from 'react-router-dom';

function SignupStep2() {
  const navigate2 = useNavigate();

  // State for all form fields
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [headline, setHeadline] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [major, setMajor] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  const handleSignUpStep3Redirect = async () => {
    // Collect all data
    const profileData = {
      firstName,
      secondName,
      headline,
      graduationYear,
      major,
      jobTitle,
      company,
      location,
    };

    // Send to backend
    try {
      const res = await fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (res.ok) {
        // Go to next step
        navigate2('/LightStep');
      } else {
        alert('Error saving profile info');
      }
    } catch {
      alert('Network error');
    }
  }

  return (
    <div>
      <div className="header">
        <img src={logo} alt="Logo" />
        <div className="headerTopic">
          <h1>Join Our Alumni Network</h1>
          <p>Connect, Share, and Grow with Fellow Graduates</p>
        </div>
      </div>
      <div className="loginInfo2">
        <div className="steps1"><Loginstep /></div><br />
        <p className='basic'>Basic Profile Information</p><br />
        <div className="profile"><ProfilePic /></div><br />
        <div className="names">
          <div className="fname">
            First Name <br />
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='Enter First Name' />
          </div>
          <div className="sname">
            Second Name <br />
            <input type="text" value={secondName} onChange={e => setSecondName(e.target.value)} placeholder='Enter Second Name' />
          </div>
        </div><br />
        <p>Professional Headline</p>
        <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} placeholder='Enter Professional Headline' /><br /><br />
        <p>Graduation Year</p>
        <input type="text" value={graduationYear} onChange={e => setGraduationYear(e.target.value)} placeholder='Year' /> <br /><br />
        <p>Major/Department</p>
        <input type="text" value={major} onChange={e => setMajor(e.target.value)} placeholder='Enter Major/Department' /><br /><br />
        <div className="current">
          <p>Current Position</p>
          <div className="jobNcompany">
            <div className="job">
              <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder='Enter Job Title' />
            </div>
            <div className="company">
              <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder='Enter Company' />
            </div>
          </div>
        </div><br />
        <p>Location</p>
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder='Enter Location' /><br /><br />
        <div className="continue">
          <button onClick={handleSignUpStep3Redirect}>Continue</button>
        </div>
      </div>
      <div className="need">Need help?<a href="">Contact Support</a></div>
    </div>
  )
}

export default SignupStep2
