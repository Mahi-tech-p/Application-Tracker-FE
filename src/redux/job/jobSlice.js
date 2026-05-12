import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { addJob, deleteJob, getJobs, updateJob } from "../../services/jobService";

const initialState = {
  jobs: [],
  loading: false,
  error: null
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, thunkAPI) => {
  try {
    const response = await getJobs();
    return response.data

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const addJobThunk = createAsyncThunk("jobs/addJobs", async (jobData, thunkAPI) => {
  try {
    const res = await addJob(jobData)
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const deleteJobThunk = createAsyncThunk("jobs/delete", async (id, thunkAPI) => {
  try {
    const res = await deleteJob(id);
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.message)
  }
})
export const updateJobThunk = createAsyncThunk("jobs/update", async ({ id, formData }, thunkAPI) => {
  try {
    const res = await updateJob(id, formData);
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.message)
  }
})
const jobSlice = createSlice({
  name: "jobs",

  initialState,

  reducers: {

    // setJobs: (state, action) => {
    //   state.jobs = action.payload;
    // },

    // addJobRedux: (state, action) => {
    //   state.jobs.push(action.payload);
    // },

    // removeJobRedux: (state, action) => {
    //   state.jobs = state.jobs.filter(
    //     (job) => job._id !== action.payload
    //   );
    // },

    // updateJobRedux: (state, action) => {
    //   state.jobs = state.jobs.map((job) =>
    //     job._id === action.payload._id
    //       ? action.payload
    //       : job
    //   );
    // },

  },
  extraReducers: (builder) => {
    builder
      //fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      // Add job
      .addCase(addJobThunk.fulfilled, (state, action) => {
        state.jobs.push(action.payload)
      })
      // Delete Job
      .addCase(deleteJobThunk.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload)
      })
      .addCase(updateJobThunk.fulfilled, (state, action) => {
      state.jobs = state.jobs.map((job)=> job._id ===action.payload._id ? action.payload : job)
    })
  }
});

export const {
  setJobs,
  addJobRedux,
  removeJobRedux,
  updateJobRedux,
} = jobSlice.actions;

export default jobSlice.reducer;