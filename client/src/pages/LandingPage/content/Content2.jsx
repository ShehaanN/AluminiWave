import React from "react";
import "./Content2.css";
import active from "../../../assets/active.png";
import sara from "../../../assets/sara.png";
import { useNavigate } from "react-router-dom";



function Content2() {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/Login");
  };
  return (
    <div>
      <div className="mainTopic">
        <span className="Propositions">Value Propositions</span>
        <h1 className="everything">Everything you need to succeed</h1>
      </div>
      <div className="paragraph">
        <div className="part1">
          <div className="image"></div>
          <div className="para1">
            <h4 className="personalized">Personalized Mentorship Matching</h4>
            <br />
            Find the perfect mentor with our AI-powered <br />
            compatibility system,connecting you with <br />
            professionals who understand your journey.
          </div>
        </div>
        <div className="part2">
          <div className="image"></div>
          <div className="para2">
            <h4 className="Building">Career-Building Events</h4>
            <br />
            Discover industry-specific networking sessions,<br />
             workshops, and conferences designed to expand your <br />
              professional horizons.
          </div>
        </div>
        <div className="part3">
          <div className="image"></div>
          <div className="para3">
            <h4 className="Exclusive">Exclusive Job Opportunities</h4>
            <br />
            Access positions shared directly by fellow alumni and <br />
             trusted partners, with application tracking and <br />
              preparation resources.
          </div>
        </div>
      </div>
      <br />
      <div className="hear">
        <div className="mainTopic">
          <span className="Testimonials">Testimonials</span>
          <h1 className=" community">Hear from our community</h1>
        </div>
        <div className="mainPart">
          <div className="partA">
            <div className="paraA">
              <div className="imagePartA">
                <div className="sara">
                  <img src={sara} alt="sara" />
                </div>
                <div className="infoA">
                  Sarah Chen <br />
                  Class of 2015, Senior Product Manager
                </div>
              </div>
              <br />
              <p>
                "AluminiWave transformed how I give back to my university
                community.
                <br /> The platform made it incredibly easy to connect with{" "}
                <br /> students who could benefit most from my experience, and
                the <br />
                structured mentorship tools helped ensure our time together was
                productive."
              </p>
            </div>
          </div>
          <div className="partB">
            <div className="paraB">
              <div className="imagePartB">
                <img src={sara} alt="" />
              </div>
              <div className="infoB">
                Sarah Chen <br />
                Class of 2015, Senior Product Manager
              </div>
            </div>
            <br />
            <p>
              "AluminiWave transformed how I give back to my university
              community. <br /> The platform made it incredibly easy to connect
              with students who <br /> could benefit most from my experience,
              and the <br />
              structured mentorship tools helped ensure our time together was
              productive."
            </p>
          </div>
        </div>
      </div>

      <div className="longImage">
        <img src={active} alt="" />
      </div>
      <div className="joinPart">
        <h3>Join the AluminiWave Community Today</h3>
        <p>
          Create your profile in minutes and start building meaningful
          professional connections that last a lifetime.
        </p><br />
        <button onClick={handleLoginRedirect} className="profile">Create your profile</button>
      </div>
      <div className="footer">
        <div className="part1">
          <ul className="a">
            <li>
              <a href="">Company</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Carrers</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
          </ul>
        </div>
        <div className="part2">
          <ul>
            <li>
              <a href="">Future</a>
            </li>
            <li>
              <a href="">Membership</a>
            </li>
            <li>
              <a href="">Event</a>
            </li>
            <li>
              <a href="">Jobs</a>
            </li>
          </ul>
        </div>
        <div className="part3">
          <ul>
            <li>
              <a href="">Support</a>
            </li>
            <li>
              <a href="">Help Center</a>
            </li>
            <li>
              <a href="">Privacy</a>
            </li>
            <li>
              <a href="">Terms</a>
            </li>
          </ul>
        </div>
        <div className="part4">
          <ul>
            <li>
              <a href="">Connect</a>
            </li>
            <li>
              <a href=""></a>
            </li>
            <li>
              <a href=""></a>
            </li>
            <li>
              <a href=""></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="all">
        <p>© 2025 AluminiWave. All rights reserved.</p>
      </div>
      <hr />
    </div>
  );
}

export default Content2;
