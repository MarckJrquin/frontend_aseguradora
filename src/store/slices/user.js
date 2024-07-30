import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/user.service';

export const getProfileData = createAsyncThunk('user/getProfileData', async (_, { rejectWithValue }) => {
    try {
        const response = await UserService.getProfileData();
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateProfileData = createAsyncThunk('user/updateProfileData', async (userData, { rejectWithValue }) => {
    try {
        const response = await UserService.updateProfileData(userData);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updatePassword = createAsyncThunk('user/updatePassword', async (passwordData, { rejectWithValue }) => {
    try {
        const response = await UserService.updatePassword(passwordData);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteAccount = createAsyncThunk('user/deleteAccount', async (_, { rejectWithValue }) => {
    try {
        const response = await UserService.deleteAccount();
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    profile: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProfileData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProfileData.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(getProfileData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateProfileData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProfileData.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(updateProfileData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteAccount.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteAccount.fulfilled, (state) => {
            state.loading = false;
            state.profile = null;
        })
        .addCase(deleteAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default userSlice.reducer;
