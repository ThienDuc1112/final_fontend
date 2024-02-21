import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: "",
    jobType: "Job Type",
    career: "All Industries",
    pageNumber: 1,
    minSalary: 1,
    maxSalary: 200,
    experience: [],
    date: "All",
    position: [],
    education: []
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setJobType: (state, action) => {
      state.jobType = action.payload;
    },
    setCareer: (state, action) => {
      state.career = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setMinSalary: (state, action) => {
      state.minSalary = action.payload;
    },
    setMaxSalary: (state, action) => {
      state.maxSalary = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
  },
});

export const {
  setQuery,
  setJobType,
  setCareer,
  setPageNumber,
  setMinSalary,
  setMaxSalary,
  setExperience,
  setDate,
  setPosition,
  setEducation
} = searchSlice.actions;

export default searchSlice.reducer;

export const selectQuery = (state) => state.search.query;
export const selectJobType = (state) => state.search.jobType;
export const selectCareer = (state) => state.search.career;
export const selectPageNumber = (state) => state.search.pageNumber;
export const selectMinSalary = (state) => state.search.minSalary;
export const selectMaxSalary = (state) => state.search.maxSalary;
export const selectExperience = (state) => state.search.experience;
export const selectDate = (state) => state.search.date;
export const selectPosition = (state) => state.search.position;
export const selectEducation = (state) => state.search.education;