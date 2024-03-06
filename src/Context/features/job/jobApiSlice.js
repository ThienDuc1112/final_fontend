"use client";
import { apiSlice } from "../../api";

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (media) => ({
        url: "/Job",
        method: "POST",
        body: media,
      }),
    }),
  }),
});

export const { useCreateJobMutation } = jobApiSlice;
