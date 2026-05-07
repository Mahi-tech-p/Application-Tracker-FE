import axios from "axios"; 
const API = axios.create(
    {baseURL : "http://localhost:5050/api/jobs/"}
)
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