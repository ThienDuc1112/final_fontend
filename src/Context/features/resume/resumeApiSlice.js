"use client";
import { apiSlice } from "../../api";

export const resumeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResumeInfo: builder.query({
      query: ({id}) => ({
        url: `/ViewResume/${id}`,
      }),
    }),
    getAllResumeInfo: builder.query({
      query: ({userId}) => ({
        url: `/GetResume/${userId}`,
      }),
    }),
  }),
});

export const { useGetResumeInfoQuery,useGetAllResumeInfoQuery} = resumeApiSlice;