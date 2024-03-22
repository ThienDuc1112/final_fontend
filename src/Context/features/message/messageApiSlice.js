"use client";
import { apiSlice } from "../../api";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: ({ userId, page }) => ({
        url: `/GetMessagesByUser/${userId}?page=${page}`,
        method: "GET",
      }),
    }),
    deleteMessage: builder.mutation({
      query: ({ id }) => ({
        url: `/Message/${id}`,
        method: "DELETE",
      }),
    }),
    updateMessage: builder.mutation({
        query: (message) => ({
          url: `/Message`,
          method: "PUT",
          body: message
        }),
      }),
      getNewMessageCount: builder.query({
        query: ({ userId }) => ({
          url: `/GetNewMessageCount/${userId}`,
          method: "GET",
        }),
      }),
  }),
});

export const { useGetMessageQuery, useDeleteMessageMutation, useUpdateMessageMutation, useGetNewMessageCountQuery } = messageApiSlice;
