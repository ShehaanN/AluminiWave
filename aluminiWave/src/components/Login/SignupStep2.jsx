import React from 'react'
import logo from '../../assets/logo.png'
import Loginstep from './Loginstep'
import ProfilePic from './ProfilePic'
import './SignupStep2.css'
import { useNavigate } from 'react-router-dom';



function SignupStep2() {
const navigate2 = useNavigate();
const handleSignUpStep3Redirect=()=>{
      navigate2('/SignupStep3')
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
                  <div className="steps1"><Loginstep></Loginstep></div><br />
                  <p className='basic'>Basic Profile Information</p><br />
                  <div className="profile"><ProfilePic></ProfilePic></div><br />
                  <div className="names">
                        <div className="fname">
                              First Name <br />
                              <input type="text" name="" id="" placeholder='Enter First Name'/>
                        </div>
                        <div className="sname">
                              Second Name <br />
                              <input type="text" placeholder='Enter Second Name'/>
                        </div>
                  </div><br />
                  <p>Professional Headline</p>
                  <input type="text" placeholder='Enter Professional Headline'/><br /><br />
                  <p>Graduation Year</p>
                  <input type="text" placeholder='Year'/> <br /><br />
                  <p>Major/Department</p>
                  <input type="text" placeholder='Enter Major/Department'/><br /><br />
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
                  </div><br />
                  <p>Location</p>
                  <input type="text" placeholder='Enter Location'/><br /><br />
                  <div className="continue">
                        <button onClick={handleSignUpStep3Redirect}>Continue</button>
                  </div>
            </div>
            <div className="need">Need help?<a href="">Contact Support</a></div>
    </div>
  )
}

export default SignupStep2
