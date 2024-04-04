"use client";
import { apiSlice } from "../../api";

export const languageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({ 
    createLanguage: builder.mutation({
      query: (language) => ({
        url: `/Language`,
        method: "POST",
        body: language,
      }),
    }),
  }),
});

export const { useCreateLanguageMutation} = languageApiSlice;