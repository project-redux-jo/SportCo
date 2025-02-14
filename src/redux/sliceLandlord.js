import { createSlice } from "@reduxjs/toolkit";
import { auth, database, createUserWithEmailAndPassword, ref, set } from "../firebase";
import Swal from "sweetalert2";


export const registerLandlord = ({ fullName, email, phone, location, profileImagePath, extraImagePath }) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, "defaultPassword123");
    const user = userCredential.user;

 
    await set(ref(database, `landlords/${user.uid}`), {
      fullName,
      email,
      phone,
      location,
      profileImagePath,  
      extraImagePath,    
      
    });

    dispatch({
      type: "auth/registerLandlordSuccess",
      payload: { uid: user.uid, fullName, email, phone, location, profileImagePath, extraImagePath },
    });

    Swal.fire({
      title: "Registration Successful!",
      text: "Redirecting to dashboard...",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

  } catch (error) {
    Swal.fire("Error!", error.message, "error");

    dispatch({
      type: "auth/registerLandlordFailure",
      payload: error.message,
    });
  }
};

const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const authSlice = createSlice({
  name: "Land",
  initialState: {
    user: storedUser,
    loading: false,
    error: null,
  },
  reducers: {
    registerLandlordSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      
    },
    registerLandlordFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
      localStorage.removeItem("user");
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export const { registerLandlordSuccess, registerLandlordFailure } = authSlice.actions;

export default authSlice.reducer;

