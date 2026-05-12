import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/auth/authSlice'
const Navbar = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleLogOut = () => {
        // localStorage.removeItem("token");
        try {
            dispatch(logOut()).unwrap()
            navigate('/login')
        } catch (error) {
            console.log(error.res.data)
        }

    }
    return (
        <div className="navbar">
            <h3>Dashboard</h3>
            <button onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default Navbar