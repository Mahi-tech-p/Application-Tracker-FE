import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: "jobs",

  initialState,

  reducers: {

    setJobs: (state, action) => {
      state.jobs = action.payload;
    },

    addJobRedux: (state, action) => {
      state.jobs.push(action.payload);
    },

    removeJobRedux: (state, action) => {
      state.jobs = state.jobs.filter(
        (job) => job._id !== action.payload
      );
    },

    updateJobRedux: (state, action) => {
      state.jobs = state.jobs.map((job) =>
        job._id === action.payload._id
          ? action.payload
          : job
      );
    },

  },
});

export const {
  setJobs,
  addJobRedux,
  removeJobRedux,
  updateJobRedux,
} = jobSlice.actions;

export default jobSlice.reducer;