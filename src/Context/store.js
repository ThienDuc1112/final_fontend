'use client'
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import searchReducer from "./features/search/searchSlice";
import authReducer from "./features/auth/authSlice";
import resumeReducer from "./features/resume/resumeSlice";
import applicationReducer from "./features/application/applicationSlice";
import interviewReducer from "./features/interview/interviewDetailSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    search: searchReducer,
    resume: resumeReducer,
    application: applicationReducer,
    interview: interviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
