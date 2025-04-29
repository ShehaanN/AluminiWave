import React from "react";
import "./Content.css";
import rightLogo from "../../../assets/right.png";

function Content() {
  return (
    <div>
      <div className="mainContent">
        <div className="leftContent">
          <div className="header123">
            <h1>
              Connect, Mentor,
              <br />
              Grow:
            </h1>
            <span>
              <h1>
                Your Alumni Network <br />
                Reimagined
              </h1>
            </span>
          </div>
          <br />
          <div className="para">
            <p>
              AluminiWave brings together alumni and students in a powerful{" "}
              <br />
              platform designed for meaningful connections and career <br />
              growth. Join thousands of professionals and students already{" "}
              <br />
              benefiting from tailored mentorships, exclusive events, and job{" "}
              <br />
              opportunities.
            </p>
          </div>
          <br />
          <br />
          <div className="mainContentButton">
            <button>Get Start</button>
            <button>Learn More</button>
          </div>
        </div>
        <div className="rightContent">
          <img src={rightLogo} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Content;
