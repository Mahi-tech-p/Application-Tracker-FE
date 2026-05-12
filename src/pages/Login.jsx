import React, { useState } from 'react'
import "../styles/login.css"
import { loginUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../redux/auth/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }
    )

  }
  const handleLogin = async () => {

    try {
      // const res = await loginUser(formData);
      // localStorage.setItem("token", res.data.token)
      // alert("login Successful")
      await dispatch(loginThunk(formData)).unwrap()
      toast.success("Login Successful")
      navigate('/dashboard')
    } catch (error) {
      console.log(error.response.data)
      // alert("login Failed")
      toast.error(error.message || "Login failed")

    }
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <input type="email" name='email' placeholder='Enter your email..' onChange={handleOnChange} />
        <input type="text" name='password' placeholder='Enter your password..' onChange={handleOnChange} />
        <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
      </div>
    </div>
  )
}

export default Login