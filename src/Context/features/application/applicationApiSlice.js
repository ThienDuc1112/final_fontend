"use client";
import { apiSlice } from "../../api";

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationList: builder.query({
      query: ({jobId, status}) => ({
        url: `/GetApplications`,
        params: { jobId, status },
      }),
    }),
    updateApplication: builder.mutation({
        query: (app) => ({
          url: "/AppliedJob",
          method: "PUT",
          body: app,
        })
      })
  }),
});

export const { useGetApplicationListQuery, useUpdateApplicationMutation} = applicationApiSlice;
