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
    addInterview: builder.mutation({
      query: (interview) => ({
        url: "/Interview",
        method: "POST",
        body: interview,
      }),
    }),
  }),
});

export const { useGetInterviewListQuery, useGetMeetingRoomQuery, useAddInterviewMutation } = interviewApiSlice;
