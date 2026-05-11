import React, { useState } from 'react'
import { registerUser } from '../services/authService'
import '../styles/signup.css'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:""
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSignUp = async () => {
    try {
      const res = await registerUser(formData)
       alert("Signup Successful");

      navigate("/login");
    } catch (error) {
      console.log(error.response.data)

    }
  }
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <input type="text" name='name' placeholder='Enter your name..' onChange={handleChange} />
        <input type="email" name='email' placeholder='Enter your email...' onChange={handleChange} />
        <input type="text" name='password' placeholder='Enter your password..' onChange={handleChange} />
        <button onClick={handleSignUp}>Sign Up</button>
        <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
      </div>
    </div>
  )
}

export default SignUp