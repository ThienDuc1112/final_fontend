'use client'
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import searchReducer from "./features/search/searchSlice";
import authReducer from "./features/auth/authSlice";
import resumeReducer from "./features/resume/resumeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    search: searchReducer,
    resume: resumeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
