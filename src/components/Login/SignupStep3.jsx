import React from 'react'
import logo from '../../assets/logo.png';
import Loginstep from './Loginstep';
import './SignupStep3.css'

function SignupStep3() {
  return (
    <div>
        <div className="header">
              <img src={logo} alt="Logo" />
              <div className="headerTopic">
                <h1>Join Our Alumni Network</h1>
                <p>Connect, Share, and Grow with Fellow Graduates</p>
              </div>
            </div>
            <div className="steps3">
                  <Loginstep></Loginstep>
            </div>
            <div className="info3">
                  <p>Career Interests & Expertise</p>
                  <p>Select Your Industries of Interest (Multiple)</p>
                  <div className="checkBoxes">
                        <div className="firstRow">
                              <label htmlFor="technology">
                                    <input type="checkbox" name="" id="" /> Technology
                              </label>
                              <label htmlFor="">
                                    <input type="checkbox" name="" id="" /> Business
                              </label>
                              <label htmlFor="">
                                    <input type="checkbox" name="" id="" /> Engineering
                              </label>
                        </div>
                        <div className="secondRow">
                              <label htmlFor="">
                              <input type="checkbox" name="" id="" /> Art & Design
                              </label>
                              <label htmlFor="">
                                    <input type="checkbox" name="" id="" /> Healthcare
                              </label>
                              <label htmlFor="">
                                    <input type="checkbox" name="" id="" /> Healthcare
                              </label>
                        </div>
                  </div>
                  <p>Skills & Expertise</p>
                  <input type="text" placeholder='Type a skill (e.g., Leadership, Marketing, Data Analysis...)'/>
                  <p>Career Stage</p>
                  <select name="" id="">
                        <option value="">Current Student</option>
                  </select>
                  <p>Mentorship Preferences</p>
                  <label htmlFor=""><input type="checkbox" /> I want to be a mentor</label><br />
                  <label htmlFor=""><input type="checkbox" /> I'm looking for a mentor</label><br />
                  <label htmlFor=""><input type="checkbox" /> Interested in group mentoring sessions</label><br />
                  <p>Areas of Expertise/Interest</p>
                  <textarea name="" id="" placeholder="Share your specific areas of expertise or topics you'd like to learn about 
                  from mentors...">
                        
                  </textarea>
                  <p>Preferred Communication Methods</p>
                  <div className="buttonFirstRow">
                        <button>Virtual Meetings</button>
                        <button>In-person Meetings</button>
                       
                  </div>
                  <div className="buttonSecondRow">
                        <button>Email</button>
                        <button>Chat</button>
                  </div>
                  <div className="saveButons">
                        <button>Save & Continue</button>
                        
                  </div>
            </div>
    </div>
  )
}

export default SignupStep3
