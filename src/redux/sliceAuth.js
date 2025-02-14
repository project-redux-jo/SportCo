import { createSlice } from "@reduxjs/toolkit";
import {
  auth,
  database,
  ref,
  set,
  get,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  signOut,
} from "../firebase";
import Swal from "sweetalert2";
import axios from "axios";

// ✅ تسجيل الدخول باستخدام Google
export const signUpWithGoogle = () => async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // ✅ حفظ بيانات المستخدم في Firebase
    await set(ref(database, `users/${user.uid}`), {
      fullName: user.displayName,
      email: user.email,
      phone: user.phoneNumber || "",
    });

    const userData = {
      uid: user.uid,
      fullName: user.displayName,
      email: user.email,
      phone: user.phoneNumber || "",
    };

    dispatch({
      type: "auth/googleSignUpSuccess",
      payload: userData,
    });

    Swal.fire({
      title: "Google Sign-Up Successful!",
      text: "Redirecting to HomePage...",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    return userData;
  } catch (error) {
    Swal.fire("Error!", error.message, "error");

    dispatch({
      type: "auth/googleSignUpFailure",
      payload: error.message,
    });

    return Promise.reject(error); // ✅ Ensure errors are properly returned
  }
};

export const signUpUser =
  ({ fullName, email, phone, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ حفظ بيانات المستخدم في Firebase Realtime Database
      await set(ref(database, `users/${user.uid}`), { fullName, email, phone });

      const userData = { uid: user.uid, fullName, email, phone };

      dispatch({
        type: "auth/signUpSuccess",
        payload:  userData ,
      });

      Swal.fire({
        title: "Registration Successful!",
        text: "Redirecting to Homepage...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      return userData;
    } catch (error) {
      // ✅ إذا كان البريد الإلكتروني مستخدمًا مسبقًا
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "This email is already in use. Please log in or use another email.",
        });
      } else {
        Swal.fire("Error!", error.message, "error");
      }

      dispatch({
        type: "auth/signUpFailure",
        payload: error.message,
      });

      return Promise.reject(error); // ✅ Ensure errors are properly returned
    }
  };

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: "auth/loginRequest" });

    try {
      // 🔹 تسجيل الدخول في Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 🔹 جلب بيانات المستخدم من Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        throw new Error("User data not found in database.");
      }

      const userData = snapshot.val();

      // ✅ تحديد الدور بناءً على البريد الإلكتروني
      const role = userData.email === "admin@gmail.com" ? "Admin" : "User";

      // ✅ تحديث حالة المستخدم في Redux
      dispatch({
        type: "auth/loginSuccess",
        payload: {
          uid: user.uid,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          role: role,
        },
      });

      // ✅ إشعار للمستخدم
      Swal.fire({
        title: "Login Successful!",
        text: "Redirecting to HomePage...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      return userData;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error.message,
      });

      dispatch({
        type: "auth/loginFailure",
        payload: error.message,
      });

      return Promise.reject(error); // ✅ Ensure errors are properly returned
    }
  };

// ✅ تسجيل الخروج
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth); // 🔹 تسجيل الخروج من Firebase
    dispatch(logout()); // 🔹 مسح بيانات المستخدم من Redux

    Swal.fire({
      title: "Logged Out!",
      text: "You have been successfully logged out.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
};




const storedUser = JSON.parse(localStorage.getItem("user")) || null;
// ✅ تعريف الـ Slice وإضافة Reducers
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    loading: false,
    error: null,
  },
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    signUpFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
      localStorage.removeItem("user");
    },
    googleSignUpSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    googleSignUpFailure: (state, action) => {
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
      localStorage.removeItem("user");
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); 
    },
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;