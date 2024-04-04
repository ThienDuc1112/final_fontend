"use client";
import { apiSlice } from "../../api";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: ({message}) => ({
        url: `/Chat/${message}`,
      }),
    }),
  }),
});

export const {
  useGetMessageQuery
} = chatApiSlice;
