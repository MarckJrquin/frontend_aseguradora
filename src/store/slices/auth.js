import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const signin = createAsyncThunk('auth/signin', async (credentials, { rejectWithValue }) => {
    try {
        const response = await AuthService.signin(credentials.username, credentials.password);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {
        const response = await AuthService.signup(userData);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const signout = createAsyncThunk('auth/signout', async () => {
    await AuthService.signout();
});


export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const response = await AuthService.getCurrentUser();
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const initialState = {
    user: user ? user : null,
    isLoggedIn: !!user,
    error: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(signin.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;
        })
        .addCase(signin.rejected, (state, action) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = action.payload;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;
        })
        .addCase(signup.rejected, (state, action) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = action.payload;
        })
        .addCase(signout.fulfilled, (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = action.payload;
        });
    }
});


export default authSlice.reducer;