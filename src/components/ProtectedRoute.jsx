import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    // const token = localStorage.getItem("token")
    const {isAuthenticated} = useSelector((state)=>state.auth)
    if (!isAuthenticated) {
        return <Navigate  to='/login'/>
    }
    return children
}

export default ProtectedRoute