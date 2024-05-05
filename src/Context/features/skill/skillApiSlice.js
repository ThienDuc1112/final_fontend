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
    createSkill: builder.mutation({
      query: (skill) => ({
        url: `/Skill`,
        method: "POST",
        body: skill,
      }),
    }),
    triggerLanguage: builder.mutation({
      query: (id) => ({
        url: `/EnableLanguage/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {useTriggerSkillMutation, useCreateSkillMutation, useTriggerLanguageMutation} = skillApiSlice;
