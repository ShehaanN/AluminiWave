import React from 'react'
import './Content2.css'
import active from '../../assets/active.png'

function Content2() {
  return (
    <div>
      <div className='mainTopic'>
        <span>Value Propositions</span><br />
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
       
      </div>
      <div className="longImage">
        <img src={active} alt="" />
      </div>
      <div className="joinPart">
        <h3>Join the AluminiWave Community Today</h3>
        <p>Create your profile in minutes and start building meaningful professional connections that last a lifetime.</p>
        <button>Create your profile</button>
      </div>
    </div>
  )
}

export default Content2
