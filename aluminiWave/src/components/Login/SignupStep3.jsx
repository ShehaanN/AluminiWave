import React from 'react'
import logo from '../../assets/logo.png';
import './SignupStep3.css'

function SignupStep3() {
  return (
    
      <div className="header">
                    <img src={logo} alt="Logo" />
                    <div className="headerTopic">
                      <h1>Welcome to AluminiWave!</h1>
                      <p className='is'>Your registration is complete</p>
                    </div>
                    <div className="finalContent">
                      <img src={logo} alt="" />
                      <div className="complete">Registration Complete!</div><br />
                      <p className='welcome'>Welcome back to the community!</p>
                      <p className='exp'>Your experience in Technology can help shape the next generation.</p><br />
                      <div className="we">✓ You can start connecting with other alumni</div>
                      <button className='finalbutton'>Go to Dashboard</button>
                    </div>
                    <div className="need">Need help? Contact Support</div>
                    
    </div>
  )
}

export default SignupStep3
