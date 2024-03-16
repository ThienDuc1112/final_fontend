import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trigger: false,
  interviewSchedule: null,
  meetingUrl: null,
  notify: "",
  applicationId: 0,
  status: "",
};

const interviewSlice = createSlice({
  name: "interview",
  initialState: initialState,
  reducers: {
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    setInterviewSchedule: (state, action) => {
      state.interviewSchedule = action.payload;
    },
    setMeetingUrl: (state, action) => {
      state.meetingUrl = action.payload;
    },
    setNotify: (state, action) => {
      state.notify = action.payload;
    },
    setApplicationId: (state, action) => {
      state.applicationId = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  setTrigger,
  setInterviewSchedule,
  setMeetingUrl,
  setNotify,
  setApplicationId,
  setStatus,
} = interviewSlice.actions;

export default interviewSlice.reducer;

export const selectTrigger = (state) => state.interview.trigger;
export const selectInterviewSchedule = (state) =>
  state.interview.interviewSchedule;
export const selectMeetingUrl = (state) => state.interview.meetingUrl;
export const selectNotify = (state) => state.interview.notify;
export const selectApplicationId = (state) => state.interview.applicationId;
export const selectStatus = (state) => state.interview.status;

