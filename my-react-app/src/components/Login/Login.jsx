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
    </div>
  )
}

export default Login
