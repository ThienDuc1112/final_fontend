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
    hideResume: builder.mutation({
      query: (resume) => ({
        url: `/HideResume`,
        method: 'PUT',
        body: resume
      }),
    }),
  }),
});

export const { useGetResumeInfoQuery,useGetAllResumeInfoQuery, useHideResumeMutation} = resumeApiSlice;