import React from 'react'
import "../styles/landing.css"
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Job Application Tracker</h1>
        <p>Track your job applications efficiently</p>
        <div className="btn-grp">
          <Link to="/login"><button className='login-btn'>Login</button></Link>
          <Link to="/signup"><button className='signup-btn'>Sign Up</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Landing