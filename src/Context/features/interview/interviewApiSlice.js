"use client";
import { apiSlice } from "../../api";

export const interviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInterviewList: builder.query({
      query: ({ appId }) => ({
        url: `/Interview/${appId}`,
      }),
    }),
    getMeetingRoom: builder.query({
      query: ({ date }) => ({
        url: `/Zoom/${date}`,
      }),
    }),
  }),
});

export const { useGetInterviewListQuery, useGetMeetingRoomQuery } = interviewApiSlice;
