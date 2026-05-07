import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
const Navbar = () => {
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }
    return (
        <div className="navbar">
            <h3>Dashboard</h3>
            <button onClick={handleLogOut}>Logout</button>
      </div>
  )
}

export default Navbar