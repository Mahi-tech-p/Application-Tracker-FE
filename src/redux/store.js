import { configureStore } from "@reduxjs/toolkit";
import JobReducer from '../redux/job/jobSlice'

export const store = configureStore({
    reducer: {
        jobs : JobReducer
    }
})