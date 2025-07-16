import React from "react";
import "./Nav.css";
import logo from "../../../assets/logo-home.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar">
      <div className="nav">
        <div className="content">
          <img src={logo} alt="Logo" />
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
