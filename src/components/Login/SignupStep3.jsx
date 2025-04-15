import React from 'react'
import logo from '../../assets/logo.png';
import Loginstep from './Loginstep';
import './SignupStep3.css'
import { useNavigate } from 'react-router-dom';

function SignupStep3() {
      const navigate1 = useNavigate();
        const handleSignUpStep4Redirect=()=>{
            navigate1('/SignupComplete')
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
            
            <div className="info3">
                  <div className="steps3">
                        <Loginstep></Loginstep>
                  </div><br />
                  <p className='career'>Career Interests & Expertise</p><br />
                  <p className='select'>Select Your Industries of Interest (Multiple)</p> <br />
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
                  </div><br />
                  <p className='skill'>Skills & Expertise</p>
                  <input type="text" placeholder='Type a skill (e.g., Leadership, Marketing, Data Analysis...)' className='skillInput'/>
                  <p className='stage'>Career Stage</p>
                  <select name="" id="">
                        <option value="">Current Student</option>
                  </select>
                  <p className='mentor'>Mentorship Preferences</p>
                  <div className="mentorCheckbox">
                        <label htmlFor=""><input type="checkbox" /> I want to be a mentor</label><br />
                        <label htmlFor=""><input type="checkbox" /> I'm looking for a mentor</label><br />
                        <label htmlFor=""><input type="checkbox" /> Interested in group mentoring sessions</label><br />
                  </div>
                  <p className='area'>Areas of Expertise/Interest</p>
                  <textarea name="" id="" placeholder="Share your specific areas of expertise or topics you'd like to learn about 
                  from mentors...">
                        
                  </textarea>
                  <p className='communi'>Preferred Communication Methods</p>
                  <div className="buttonFirstRow">
                        <button>Virtual Meetings</button>
                        <button>In-person Meetings</button>
                       
                  </div>
                  <div className="buttonSecondRow">
                        <button>Email</button>
                        <button>Chat</button>
                  </div>
                  <div className="saveButons">
                        <button onClick={handleSignUpStep4Redirect}>Save & Continue</button>
                        
                  </div>
            </div>
    </div>
  )
}

export default SignupStep3
