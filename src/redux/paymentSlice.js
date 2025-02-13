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
    const response = await axios.post('https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json', paymentData);
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