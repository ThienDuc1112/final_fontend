"use client";
import { apiSlice } from "../../api";

export const businessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessInfo: builder.query({
      query: (id) => ({
        url: `/BusinessInforDetail/${id}`,
      }),
    }),
    updateBusiness: builder.mutation({
      query: (business) => ({
        url: `/Business`,
        method: "PUT",
        body: business,
      }),
    }),
    reviewBusiness: builder.mutation({
      query: (business) => ({
        url: `/ReviewBusiness`,
        method: "PUT",
        body: business,
      }),
    }),
  }),
});

export const mediaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMedia: builder.mutation({
      query: (media) => ({
        url: "/Media/UploadMedia",
        method: "POST",
        body: media,
      }),
    }),
  }),
});

export const { useCreateMediaMutation } = mediaApiSlice;
export const { useGetBusinessInfoQuery, useUpdateBusinessMutation, useReviewBusinessMutation } = businessApiSlice;
