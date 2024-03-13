import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  selectedJob: null,
  jobId: null,
  selectedStatus: "All",
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
  },
});

export const { setLoading, setSelectedJob, setSelectedStatus, setJobId } =
  applicationSlice.actions;

export default applicationSlice.reducer;

export const selectLoading = (state) => state.application.loading;
export const selectSelectedJob = (state) =>
  state.application.selectedJob;
export const selectSelectedStatus = (state) =>
  state.application.selectedStatus;
export const selectJobId = (state) => state.application.jobId;
