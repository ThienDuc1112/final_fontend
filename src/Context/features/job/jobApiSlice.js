"use client";
import { apiSlice } from "../../api";

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (job) => ({
        url: "/Job",
        method: "POST",
        body: job,
      }),
    }),
    updateJob: builder.mutation({
      query: (job) => ({
        url: "/Job",
        method: "PUT",
        body: job,
      })
    })
  }),
});

export const { useCreateJobMutation, useUpdateJobMutation } = jobApiSlice;
