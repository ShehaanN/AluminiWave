import React from "react";
import "./Content.css";
import rightLogo from "../../../assets/right.png";

function Content() {
  return (
    <div className="mainContent1">
      <div className="mainContent">
        <div className="leftContent">
          <div className="header123">
            <h1 className="mentor">
              Connect, Mentor,
              <br />
              Grow:
            </h1>
            <h1 className="network">
              Your Alumni Network <br />
              Reimagined
            </h1>
          </div>

          <div className="para">
            <p>
              AluminiWave brings together alumni and students in a powerful
              platform designed for meaningful connections and career growth.
              Join thousands of professionals and students already benefiting
              from tailored mentorships, exclusive events, and job
              opportunities.
            </p>
          </div>

          <div className="mainContentButton">
            <a href="/register">
              <button>Get Start</button>
            </a>
            {/* <button className="bg-white">Learn More</button> */}
          </div>
        </div>

        <div className="rightContent">
          <img src={rightLogo} alt="Alumni illustration" />
        </div>
      </div>
    </div>
  );
}

export default Content;
