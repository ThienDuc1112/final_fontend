"use client";
import { apiSlice } from "../../api";

export const careerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCareer: builder.query({
      query: () => ({
        url: `/GetAllCareer`,
      }),
    }),
    addCareer: builder.mutation({
      query: (career) => ({
        url: `/Career`,
        method: "POST",
        body: career,
      }),
    }),
    updateCareer: builder.mutation({
      query: (career) => ({
        url: `/Career`,
        method: "PUT",
        body: career,
      }),
    }),
    triggerCareer: builder.mutation({
      query: (career) => ({
        url: `/TriggerCareer`,
        method: "PUT",
        body: career,
      }),
    }),
  }),
});

export const {
  useGetAllCareerQuery,
  useAddCareerMutation,
  useUpdateCareerMutation,
  useTriggerCareerMutation,
} = careerApiSlice;
