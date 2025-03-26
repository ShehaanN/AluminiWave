import React from 'react'
import logo from '../../assets/logo.png'
import Loginstep from './Loginstep'
import ProfilePic from './ProfilePic'


function SignupStep2() {
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
                  <div className="steps1"><Loginstep></Loginstep></div>
                  <p>Basic Profile Information</p>
                  <ProfilePic></ProfilePic>
                  <div className="names">
                        <div className="fname">
                              First Name <br />
                              <input type="text" name="" id="" placeholder='Enter First Name'/>
                        </div>
                        <div className="sname">
                              Second Name <br />
                              <input type="text" placeholder='Enter Second Name'/>
                        </div>
                  </div>
                  <p>Professional Headline</p>
                  <input type="text" placeholder='Enter Professional Headline'/><br />
                  <p>Graduation Year</p>
                  <input type="text" placeholder=''/><br />
                  <p>Major/Department</p>
                  <input type="text" placeholder='Enter Major/Department'/><br />
                  <div className="current">
                        <p>Current Position</p>
                        <div className="jobNcompany">
                              <div className="job">
                                    <input type="text" placeholder='Enter Job Title'/>
                              </div>
                              <div className="company">
                                    <input type="text" placeholder='Enter Company'/>
                              </div>
                        </div>
                  </div>
                  <p>Location</p>
                  <input type="text" placeholder='Enter Location'/><br />
                  <div className="continue">
                        <button>Continue</button>
                  </div>
            </div>
    </div>
  )
}

export default SignupStep2
