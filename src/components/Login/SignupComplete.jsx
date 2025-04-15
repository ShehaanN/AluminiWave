import React from 'react'
import logo from '../../assets/logo.png';
import './SignupComplete.css';


function SignupComplete() {
  return (
    <div>
            
            <div className="info4">
                  <div className="completeImg">
                  <img src={logo} alt="" />
                  </div>
                  <p className='rComplete'>Registration Complete!</p>
                  <p className='welcome'>Welcome back to the community!</p>
                  <p className='your'>Your experience in Technology can help shape the next generation.</p>
                  <p className='start'>✓ You can  start connecting with other alumni</p>
                  <button className='go'>Go to Dashboard buthmika</button>
            </div>

    </div>
  )
}

export default SignupComplete
