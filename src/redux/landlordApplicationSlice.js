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
    updateLandlordApplication: (state, action) => {
      const { id, status } = action.payload;
      const application = state.applications.find((app) => app.id === id);
      if (application) {
        application.status = status;
      }
    },
  },
});

export const { setLandlordApplications, updateLandlordApplication } = landlordApplicationsSlice.actions;
export default landlordApplicationsSlice.reducer;
