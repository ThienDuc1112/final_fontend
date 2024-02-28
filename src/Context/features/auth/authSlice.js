import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {userId: "", role: "" },
    reducers: {
        setCredentials: (state, action) => {
            const {sub, role } = action.payload;
            state.userId = sub;
            state.role = role;
        },
        logOut: (state, action) => {
            state.userId = sub;
            state.role = role;
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectUserId = (state) => state.auth.userId
export const selectRole = (state) => state.auth.role