import React from 'react'
import logo from '../../assets/logo.png'
import Loginstep from './Loginstep'

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
                  <input type="text" placeholder='Enter Professional Headline'/>
            </div>
    </div>
  )
}

export default SignupStep2
