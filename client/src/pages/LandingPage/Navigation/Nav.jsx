import React from "react";
import "./Nav.css";
import logo from "../../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();

  return (
    <div>
      <div className="nav">
        <div className="content">
          <img src={logo} alt="Logo" />
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Features</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
        <div className="loginButton">
          <Link to="/login">
            <button className="login-btn">Log in</button>
          </Link>
          <Link to="/register">
            <button className="signup-btn">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
