import React from 'react'
import './Nav.css'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

function Nav() {
      const navigate = useNavigate();
  return (
    <div>
      <div className="nav">
           
            <div className="content">
            
                  
                  <img src={logo} alt="" />
                  <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Features</a></li>
                        <li><a href="">Contact</a></li>
                  </ul>
            </div>
            <div className="loginButton">
                  <div className="login"><button onClick={()=>navigate('/Login')}>Sign Up</button></div>
                  <div className="login"><button>Login</button></div>
                  



            

            </div>
      </div>
    </div>
  )
}

export default Nav
