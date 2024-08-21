import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        checkAuthStart: (state) => {
            state.loading = true;
        },
        checkAuthSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        checkAuthFailure: (state) => {
            state.loading = false; 
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, checkAuthStart, checkAuthSuccess, checkAuthFailure } = authSlice.actions;
export default authSlice.reducer;