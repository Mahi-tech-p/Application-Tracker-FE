import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    jobs:[]
}
const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload
        },
        addJobs: (state, action) => {
            state.jobs.push(action.payload)
        },
        deleteJobs: (state, action) => {
            state.jobs = state.jobs.filter((job)=>job._id !== action.payload)
        },
        updateJobs: (state, action) => {
            state.jobs = state.jobs.map((job)=>job._id === action.payload._id ? action.payload : job)
        }
    }
})

export const { setJobs, addJobs, deleteJobs, updateJobs } = jobSlice.actions
export default jobSlice.reducer;