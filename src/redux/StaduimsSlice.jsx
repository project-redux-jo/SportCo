import { createSlice } from "@reduxjs/toolkit";

const initialState = {  // Fixed typo
    courts: [],
    selectedCourt:[]
};

const stadiumsSlice = createSlice({
    name: 'courtInfo',
    initialState, // Fixed typo
    reducers: {
        fetchStadiums: (state, action) => {
            state.courts=action.payload;
        },
        fetchselectedCourt:(state,action)=>{
            state.selectedCourt=[];
            state.selectedCourt=action.payload;
        }
    }
});

// Correctly export actions
export const { fetchStadiums,fetchselectedCourt } = stadiumsSlice.actions;

export default stadiumsSlice.reducer;
