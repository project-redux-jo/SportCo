import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  paymentData: null,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData(state, action) {
      state.paymentData = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setPaymentData, setError } = paymentSlice.actions;

export const sendPaymentData = (paymentData) => async (dispatch) => {
  try {
    const dataWithStatus = { ...paymentData, status: 'Approve' };
    const response = await axios.post('https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json', dataWithStatus);
    dispatch(setPaymentData(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchPaymentDataByDate = () => async (dispatch) => {
  try {
    const response = await axios.get('https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json');
    dispatch(setPaymentData(response));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default paymentSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   paymentData: {},
//   error: null,
// };

// const paymentSlice = createSlice({
//   name: "payment",
//   initialState,
//   reducers: {
//     setPaymentData(state, action) {
//       state.paymentData = action.payload || {};
//       state.error = null;
//     },
//     setError(state, action) {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setPaymentData, setError } = paymentSlice.actions;


// export const sendPaymentData = (paymentData) => async (dispatch, getState) => {
//   try {
//     const response = await axios.post(
//       'https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json',
//       paymentData
//     );


//     const stadiumId = paymentData.stadiumId;
// console.log(stadiumId);
//     await axios.patch(
//       `https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums/${stadiumId}.json`,
//       { available: "Booked" }
//     );

//     dispatch(setPaymentData(response.data));
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };



// export const fetchPaymentDataByDate = (stadiumName) => async (dispatch) => {
//   try {
//     const response = await axios.get('https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json');
//     const allPayments = response.data;

 
//     const filteredPayments = Object.values(allPayments).filter(payment => payment.pitchName === stadiumName);

//     dispatch(setPaymentData({ data: filteredPayments }));
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };


// export default paymentSlice.reducer;
