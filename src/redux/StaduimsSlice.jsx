// 


import { createSlice } from "@reduxjs/toolkit";

const initialState = {  // Fixed typo
    // courts: [],
    // selectedCourt:[]
    // ,
        courts: JSON.parse(localStorage.getItem("courts")) || [],
    selectedCourt: JSON.parse(localStorage.getItem("selectedCourt")) || []
};




const stadiumsSlice = createSlice({
    name: 'courtInfo',
    initialState, // Fixed typo
    reducers: {
        fetchStadiums: (state, action) => {
            
            state.courts=action.payload;
             localStorage.setItem("courts", JSON.stringify(state.courts));
        },
        fetchselectedCourt:(state,action)=>{
            state.selectedCourt=[];
            state.selectedCourt=action.payload;
            localStorage.setItem("selectedCourt", JSON.stringify(state.selectedCourt));
        }
        ,addStaduim:(state,action)=>{
            // state.courts+=(action.payload);
            // state.courts = [...state.courts, action.payload]
            const newId = state.courts.length > 0 
            ? Math.max(...state.courts.map(court => Number(court.id))) + 1 
            : 1;

        // إنشاء عنصر جديد مع ID جديد
        const newCourt = { ...action.payload, id: newId.toString() };

        // إضافة العنصر الجديد إلى القائمة
        state.courts.push(newCourt);


        }
    }
});

// Correctly export actions

export const { fetchStadiums,fetchselectedCourt,addStaduim } = stadiumsSlice.actions;

export default stadiumsSlice.reducer;
