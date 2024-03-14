"use client";
import { apiSlice } from "../../api";

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationList: builder.query({
      query: ({ jobId, status }) => ({
        url: `/GetApplications`,
        params: { jobId, status },
      }),
    }),
    getApplicationDetail: builder.query({
      query: ({ id }) => ({
        url: `/GetApplicationDetail/${id}`,
        method: "GET",
      }),
    }),
    getApplicationsUser: builder.query({
      query: ({ id }) => ({
        url: `/GetAppsUser/${id}`,
        method: "GET",
      }),
    }),
    updateApplication: builder.mutation({
      query: (app) => ({
        url: "/AppliedJob",
        method: "PUT",
        body: app,
      }),
    }),
  }),
});

export const {
  useGetApplicationListQuery,
  useGetApplicationDetailQuery,
  useGetApplicationsUserQuery,
  useUpdateApplicationMutation,
} = applicationApiSlice;
