import axios from "axios"; 
const API = axios.create(
    {baseURL : `${import.meta.env.VITE_BASE_URI}/auth`}
)
export const loginUser = (data) => API.post('/login', data)
export const registerUser =(data)=>API.post("/register",data)