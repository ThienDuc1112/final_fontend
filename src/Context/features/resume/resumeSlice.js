import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experiences: [
    {
      company: "",
      title: "",
      startDate: null,
      endDate: null,
      responsibility: "",
      companyError: false,
      titleError: false,
      startTimeError: false,
      endTimeError: false,
      responsibilityError: false,
    },
  ],
  selectedSkillList: [
    {
      resumeId: 0,
      skillId: null,
      skillError: false,
    },
  ],
  selectedLanguageList: [
    {
      resumeId: 0,
      languageId: null,
      languageError: false,
    },
  ],
  educations: [
    {
      resumeId: 0,
      universityName: "",
      degree: "",
      major: "",
      startDate: null,
      endDate: null,
      description: "",
      universityError: false,
      degreeError: false,
      majorError: false,
      startDateError: false,
      endDateError: false,
    },
  ],
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setExperiences: (state, action) => {
      state.experiences = action.payload;
    },
    setSelectedSkillList: (state, action) => {
      state.selectedSkillList = action.payload;
    },
    setSelectedLanguageList: (state, action) => {
      state.selectedLanguageList = action.payload;
    },
    setEducations: (state, action) => {
      state.educations = action.payload;
    },
  },
});

export const {
  setExperiences,
  setSelectedSkillList,
  setSelectedLanguageList,
  setEducations,
} = resumeSlice.actions;

export default resumeSlice.reducer;

export const selectExperiences = (state) => state.resume.experiences;
export const selectSelectedSkillList = (state) =>
  state.resume.selectedSkillList;
export const selectSelectedLanguageList = (state) =>
  state.resume.selectedLanguageList;
export const selectEducations = (state) => state.resume.educations;