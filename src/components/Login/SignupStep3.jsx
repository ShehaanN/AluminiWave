import React from 'react';
import './SignupComplete.css';
import logo from '../../assets/logo.png'; // Make sure the path is correct

function SignupComplete() {
  return (
    <div className="info4">
      <img src={logo} alt="Logo" />
      <p className="rComplete">Registration Complete!</p>
      <p className="welcome">Welcome back to the community!</p>
      <p className="your">
        Your experience in Technology can help shape the next generation.
      </p>
      <p className="start">✓ You can start connecting with other alumni</p>
      <button className="go">Go to Dashboard</button>
    </div>
  );
}

export default SignupComplete;
