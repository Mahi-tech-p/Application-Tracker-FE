import { configureStore } from "@reduxjs/toolkit";
import JobReducer from '../redux/job/jobSlice'
import authReducer from '../redux/auth/authSlice'

export const store = configureStore({
    reducer: {
        jobs: JobReducer,
        auth: authReducer,
    }
})