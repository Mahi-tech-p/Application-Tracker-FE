import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../services/authService";


export const loginThunk = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
    try {
        const res = await loginUser(formData)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const token = localStorage.getItem("token")
const initialState = {
    user: null,
    token: token || null,
    isAuthenticated: !!token,
    loading: false,
    error: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token")

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user
                state.isAuthenticated = true
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export const { logOut } = authSlice.actions;
export default authSlice.reducer