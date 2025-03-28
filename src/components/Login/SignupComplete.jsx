import React from 'react'
import logo from '../../assets/logo.png';
import './SignupComplete.css';

function SignupComplete() {
  return (
    <div>
            <div className="header">
                  <img src={logo} alt="Logo" />
                  <div className="headerTopic">
                        <h1>Join Our Alumni Network</h1>
                        <p>Connect, Share, and Grow with Fellow Graduates</p>
                  </div>
            </div>
            <div className="info4">
                  <img src={logo} alt="" />
                  <p className='rComplete'>Registration Complete!</p>
                  <p className='welcome'>Welcome back to the community!</p>
                  <p className='your'>Your experience in Technology can help shape the next generation.</p>
                  <p className='start'>✓ You can start connecting with other alumni</p>
                  <button>Go to Dashboard</button>
            </div>

    </div>
  )
}

export default SignupComplete
