"use client"
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from "../../api";

export const careerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCareer: builder.query({
            query: () => ({
                url: `/GetAllCareer`,
            })
        })
    })
})

export const {
    useGetAllCareerQuery
} = careerApiSlice 