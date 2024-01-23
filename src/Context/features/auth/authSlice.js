import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { refreshToken: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const {access_token, refresh_token } = action.payload
            state.refreshToken = refresh_token
            state.token = access_token
        },
        logOut: (state, action) => {
            state.refreshToken = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentRefreshToken = (state) => state.auth.refreshToken
export const selectCurrentToken = (state) => state.auth.token