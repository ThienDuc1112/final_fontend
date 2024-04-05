"use client";
import { apiSlice } from "../../api";

export const favoriteJobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavoriteJob: builder.query({
      query: ({ candidateId }) => ({
        url: `/FavoriteJob/${candidateId}`,
        method: "GET",
      }),
    }),
    createFavoriteJob: builder.mutation({
      query: (object) => ({
        url: "/FavoriteJob",
        method: "POST",
        body: object,
      }),
    }),
    deleteFavoriteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/FavoriteJob/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFavoriteJobQuery,
  useCreateFavoriteJobMutation,
  useDeleteFavoriteJobMutation,
} = favoriteJobApiSlice;
