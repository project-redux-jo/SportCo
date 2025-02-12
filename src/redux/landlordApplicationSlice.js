import { createSlice } from "@reduxjs/toolkit";

const landlordApplicationsSlice = createSlice({
  name: "landlordApplications",
  initialState: {
    applications: [],
  },
  reducers: {
    setLandlordApplications: (state, action) => {
      state.applications = action.payload;
    },
    approveLandlordApplication: (state, action) => {
      state.applications = state.applications.map((app) =>
        app.id === action.payload ? { ...app, status: "Approved" } : app
      );
    },
    rejectLandlordApplication: (state, action) => {
      state.applications = state.applications.map((app) =>
        app.id === action.payload ? { ...app, status: "Rejected" } : app
      );
    },
  },
});

export const { setLandlordApplications, approveLandlordApplication, rejectLandlordApplication } =
  landlordApplicationsSlice.actions;
export default landlordApplicationsSlice.reducer;