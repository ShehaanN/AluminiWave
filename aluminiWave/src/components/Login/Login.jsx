import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import './Login.css';
import Loginstep from './Loginstep';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // default
  const [agree, setAgree] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || !agree) {
      alert("Please fill all fields and agree to the terms.");
      return;
    }

    const user = { email, password, role };

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      const data = await res.json();
      console.log("User created:", data);

      // ✅ Now go to Step 2
      navigate('/SignupStep2');
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <div className="header">
        <img src={logo} alt="Logo" />
        <div className="headerTopic">
          <h1>Join Our Alumni Network</h1>
          <p>Connect, Share, and Grow with Fellow Graduates</p>
        </div>
      </div>

      <div className="loginInfo">
        <div className="steps"><Loginstep /></div><br />
        <p className="creation">Account Creation</p>
        <div className="info">
          Email or Phone <br />
          <input
            type="email"
            placeholder="Enter your email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> <br /><br />
          Password <br />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> <br /><br />
        </div>

        <p className="password-hint">✅ 8+ characters ✅ 1 number ✅ 1 special character</p><br />

        <p>I am a:</p>
        <div className="buttons">
          <button
            className={role === 'Student' ? 'selected' : ''}
            onClick={() => setRole('Student')}
          >
            Student
          </button>
          <button
            className={role === 'Alumni' ? 'selected' : ''}
            onClick={() => setRole('Alumni')}
          >
            Alumni
          </button>
        </div><br />

        <div className="terms">
          <input
            type="checkbox"
            id="terms"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </div><br />

        <button className="continue-btn" onClick={handleSubmit}>Continue</button><br /><br />

        <p className="or-text">Or continue with</p><br />

        <div className="social-buttons">
          <button className="social-btn-linkedin">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
            <span>LinkedIn</span>
          </button>
          <button className="social-btn-google">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
