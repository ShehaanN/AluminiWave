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
      <div className="loginInfo">
            <p>Account Creation</p>
            Email or Phone <br />
            <input type="email" /><br />
            Password <br />
            <input type="password" /><br />
            <p className="password-hint">✅ 8+ characters ✅ 1 number ✅ 1 special character</p><br />
            I am a <br />
            <div className="buttons">
                  <button className='student'>Student</button>
                  <button className='alumini'>Alumini</button>


            </div>
            <div className="terms">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                        I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                  </label>
            </div>
            <button className="continue-btn">Continue</button>
            <p className="or-text">Or continue with</p>
            <div className="social-buttons">
                  <button className="social-btn linkedin">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
                        LinkedIn
                  </button>
                  <button className="social-btn google">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                        Google
                  </button>
            </div>

      </div>

    </div>
  )
}

export default Login
