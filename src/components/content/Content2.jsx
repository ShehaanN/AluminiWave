import React from 'react'
import './Content2.css'
import active from '../../assets/active.png'
import sara from '../../assets/sara.png'



function Content2() {
  return (
    <div>
      <div className='mainTopic'>
        <span>Value Propositions</span>
        <h1>Everything you need to succeed</h1>
      </div>
      <div className="paragraph">
        <div className="part1">
              <div className="image"></div>
              <div className="para1"><h4>Personalized Mentorship Matching</h4><br />Find the perfect mentor with our AI-powered <br />
                                    compatibility system,connecting you with <br />
                                    professionals who understand your journey.</div>
        </div>
        <div className="part2">
              <div className="image"></div>
              <div className="para2">
              <h4>Personalized Mentorship Matching</h4><br />Find the perfect mentor with our AI-powered <br />
                                    compatibility system,connecting you with <br />
                                    professionals who understand your journey.
            </div>
        </div>
        <div className="part3">
              <div className="image"></div>
              <div className="para3">
              <h4>Personalized Mentorship Matching</h4><br />Find the perfect mentor with our AI-powered <br />
                                    compatibility system,connecting you with <br />
                                    professionals who understand your journey.
              </div>
        </div>
       
      </div><br />
      <div className="hear">
        <div className='mainTopic'>
          <span>Testimonials</span>
          <h1>Hear from our community</h1>
        </div>
        <div className="mainPart">
          <div className="partA">
           
            <div className="paraA">
              <div className="imagePart">
                <div className="sara"><img src={sara} alt="" /> </div>
                <div className="info">Sarah Chen <br />Class of 2015, Senior Product Manager</div>

              </div><br />
            <p>"AluminiWave transformed how I give back to my university community.<br /> The platform made it 
             incredibly easy to connect with <br /> students who could benefit most from my experience, and the <br />
              structured mentorship tools helped ensure our time together was productive."</p>
            </div>
          </div>
          <div className="partB">
            <div className="paraB">
              <div className="imagePart"><img src={sara} alt="" /></div>
              <div className="info">Sarah Chen <br />Class of 2015, Senior Product Manager</div>
            </div><br />
            <p>"AluminiWave transformed how I give back to my university community. <br /> The platform made it
             incredibly easy to connect with students who <br /> could benefit most from my experience, and the <br />
              structured mentorship tools helped ensure our time together was productive."</p>
          </div>
        </div>
        
      </div>

      <div className="longImage">
        <img src={active} alt="" />
      </div>
      <div className="joinPart">
        <h3>Join the AluminiWave Community Today</h3>
        <p>Create your profile in minutes and start building meaningful professional connections that last a lifetime.</p>
        <button>Create your profile</button>
      </div>
      <div className="footer">
        <div className="part1">
          <ul className='a'>
            <li><a href="">Company</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Carrers</a></li>
            <li><a href="">Blog</a></li>
          </ul>
        </div>
        <div className="part2">
          <ul>
            <li><a href="">Future</a></li>
            <li><a href="">Membership</a></li>
            <li><a href="">Event</a></li>
            <li><a href="">Jobs</a></li>
          </ul>
        </div>
        <div className="part3">
          <ul>
            <li><a href="">Support</a></li>
            <li><a href="">Help Center</a></li>
            <li><a href="">Privacy</a></li>
            <li><a href="">Terms</a></li>
          </ul>
        </div>
        <div className="part4">
          <ul>
            <li><a href="">Connect</a></li>
            <li><a href=""><img src="" alt="" /></a></li>
            <li><a href=""><img src="" alt="" /></a></li>
            <li><a href=""><img src="" alt="" /></a></li>
          </ul>
        </div>
       
      </div>
      <div className="all">
        <p>© 2025 AluminiWave. All rights reserved.</p>

        </div>
      <hr />
     
    </div>
  )
}

export default Content2
