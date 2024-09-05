import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: '',
        email: '',
        name: '',
        error: null,
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        setUsername(state, action) {
            state.username = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setName(state, action) {
            state.name = action.payload;
        },
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },
        setRefreshToken(state, action) {
            state.refreshToken = action.payload;
        },
        clearAuth(state) {
            state.username = '';
            state.email = '';
            state.name = '';
            state.error = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { setUsername, setEmail, setName, setAccessToken, setRefreshToken, clearAuth, setError } = authSlice.actions;

export default authSlice.reducer;
