import axios from "axios"; 
const API = axios.create(
    {baseURL : `${import.meta.env.VITE_BASE_URI}/jobs`}
)
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    console.log(token, "token from interceptor")
     if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})

export const deleteJob = (id) => {
    return API.delete(`${id}`);
}
export const getJobs = () => {
   return API.get("/");
}

export const addJob = (data) => {
    return API.post("/",data)
}
export const updateJob = (id,formData) => {
    return API.put(`${id}`,formData)
}