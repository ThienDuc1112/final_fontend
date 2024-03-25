"use client";
import { apiSlice } from "../../api";

export const skillApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    triggerSkill: builder.mutation({
      query: (skill) => ({
        url: `/TriggerSkill`,
        method: "PUT",
        body: skill,
      }),
    }),
  }),
});

export const {useTriggerSkillMutation} = skillApiSlice;
