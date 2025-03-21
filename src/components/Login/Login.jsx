import React from 'react'
import logo from '../../assets/logo.png'
import './Login.css'

function Login() {
  return (
    <div>
      <div className="header">
            <img src={logo}alt="" />
            <div className="headerTopic">
                  <h1>Join Our Alumni Network</h1>
                  <p>Connect, Share, and Grow with Fellow Graduates</p>
            </div>
      </div>
      <div className="loginForm">
            <div class="progress">
                  <div class="circle done">
                        <span class="label">1</span>
                        <span class="title">Personal</span>
                  </div>
                  <span class="bar done"></span>
                  <div class="circle done">
                        <span class="label">2</span>
                        <span class="title">Address</span>
                  </div>
                  <span class="bar half"></span>
                  <div class="circle active">
                        <span class="label">3</span>
                        <span class="title">Payment</span>
                  </div>
                  <span class="bar"></span>
                  <div class="circle">
                        <span class="label">4</span>
                        <span class="title">Review</span>
                  </div>
                  <span class="bar"></span>
                  <div class="circle">
                        <span class="label">5</span>
                        <span class="title">Finish</span>
                  </div>
            </div>
      </div>
      <div className="loginInfo">
             <b>Acount Creation</b><br />
             Email or Phone <br /><input type="text" /><br />
             Password <br /> <input type="password" />
      </div>

    </div>
  )
}


