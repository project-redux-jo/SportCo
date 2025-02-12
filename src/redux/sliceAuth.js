// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { auth, database, ref, set, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, googleProvider } from '../firebase';
// import Swal from 'sweetalert2';

// // تسجيل user
// export const signUpUser = createAsyncThunk(
//   'auth/signUpUser',
//   async ({ fullName, email, phone, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // حفظ بيانات 
//       await set(ref(database, `users/${user.uid}`), { fullName, email, phone });

//       Swal.fire({
//         title: 'Registration Successful!',
//         text: 'Redirecting to login...',
//         icon: 'success',
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       return { uid: user.uid, fullName, email, phone };
//     } catch (error) {
//       Swal.fire('Error!', error.message, 'error');
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // تسجيل الدخول باستخدام Google
// export const signUpWithGoogle = createAsyncThunk(
//   'auth/signUpWithGoogle',
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       await set(ref(database, `users/${user.uid}`), {
//         fullName: user.displayName,
//         email: user.email,
//         phone: user.phoneNumber || '',
//       });

//       Swal.fire({
//         title: 'Google Sign-Up Successful!',
//         text: 'Redirecting to dashboard...',
//         icon: 'success',
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       return { uid: user.uid, fullName: user.displayName, email: user.email, phone: user.phoneNumber || '' };
//     } catch (error) {
//       Swal.fire('Error!', error.message, 'error');
//       return rejectWithValue(error.message);
//     }
//   }
// );


// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUpUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signUpUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(signUpWithGoogle.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signUpWithGoogle.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(signUpWithGoogle.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // export const loginUser = createAsyncThunk(
// //     'auth/loginUser',
// //     async ({ email, password }, { rejectWithValue }) => {
// //       try {
// //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
// //         const user = userCredential.user;
  
// //         Swal.fire({
// //           title: 'Login Successful!',
// //           text: 'Redirecting to dashboard...',
// //           icon: 'success',
// //           timer: 2000,
// //           showConfirmButton: false,
// //         });
  
// //         return { uid: user.uid, email: user.email };
// //       } catch (error) {
// //         Swal.fire('Error!', error.message, 'error');
// //         return rejectWithValue(error.message);
// //       }
// //     }
// //   );
// export const loginUser = (email, password) => async (dispatch) => {
//     try {
//       // ✅ تسجيل الدخول باستخدام Firebase Auth
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       // ✅ جلب بيانات المستخدم من Realtime Database
//       const userRef = ref(database, `users/${user.uid}`);
//       const snapshot = await get(userRef);
  
//       if (!snapshot.exists()) {
//         throw new Error("User data not found in database.");
//       }
  
//       const userData = snapshot.val();
  
//       // ✅ تحديث الحالة في Redux
//       dispatch({
//         type: "auth/loginSuccess",
//         payload: { uid: user.uid, fullName: userData.fullName, email: userData.email, phone: userData.phone },
//       });
  
//       Swal.fire({
//         title: "Login Successful!",
//         text: "Redirecting to dashboard...",
//         icon: "success",
//         timer: 2000,
//         showConfirmButton: false,
//       });
  
//     } catch (error) {
//       Swal.fire("Error!", error.message, "error");
  
//       dispatch({
//         type: "auth/loginFailure",
//         payload: error.message,
//       });
//     }
//   };
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import { auth, database, ref, set, get, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, googleProvider } from "../firebase";
import Swal from "sweetalert2";






  




// ✅ تسجيل المستخدم الجديد
// export const signUpUser = ({ fullName, email, phone, password }) => async (dispatch) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // ✅ حفظ بيانات المستخدم في Firebase
//     await set(ref(database, `users/${user.uid}`), { fullName, email, phone });

//     // ✅ تحديث حالة Redux
//     dispatch({
//       type: "auth/signUpSuccess",
//       payload: { uid: user.uid, fullName, email, phone },
//     });

//     Swal.fire({
//       title: "Registration Successful!",
//       text: "Redirecting to login...",
//       icon: "success",
//       timer: 2000,
//       showConfirmButton: false,
//     });

//   } catch (error) {
//     Swal.fire("Error!", error.message, "error");

//     dispatch({
//       type: "auth/signUpFailure",
//       payload: error.message,
//     });
//   }
// };

// // ✅ تسجيل الدخول باستخدام Google
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

    dispatch({
      type: "auth/googleSignUpSuccess",
      payload: { uid: user.uid, fullName: user.displayName, email: user.email, phone: user.phoneNumber || "" },
    });

    Swal.fire({
      title: "Google Sign-Up Successful!",
      text: "Redirecting to dashboard...",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

  } catch (error) {
    Swal.fire("Error!", error.message, "error");

    dispatch({
      type: "auth/googleSignUpFailure",
      payload: error.message,
    });
  }
};
// export const signUpUser = ({ fullName, email, phone, password }) => async (dispatch) => {
//     try {
//       dispatch({ type: "auth/loading" }); // ✅ تعيين حالة التحميل
  
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       if (!user || !user.uid) throw new Error("User creation failed!");
  
//       // ✅ حفظ بيانات المستخدم في Firebase
//       await set(ref(database, `users/${user.uid}`), { fullName, email, phone });
  
//       dispatch({
//         type: "auth/signUpSuccess",
//         payload: { uid: user.uid, fullName, email, phone },
//       });
  
//       Swal.fire({
//         title: "Registration Successful!",
//         text: "Redirecting to login...",
//         icon: "success",
//         timer: 2000,
//         showConfirmButton: false,
//       });
  
//     } catch (error) {
//       Swal.fire("Error!", error.message, "error");
  
//       dispatch({
//         type: "auth/signUpFailure",
//         payload: error.message,
//       });
//     }
//   };
export const signUpUser = ({ fullName, email, phone, password }) => async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // ✅ حفظ بيانات المستخدم في Firebase Realtime Database
      await set(ref(database, `users/${user.uid}`), { fullName, email, phone });
  
      dispatch({
        type: "auth/signUpSuccess",
        payload: { uid: user.uid, fullName, email, phone },
      });
  
      Swal.fire({
        title: "Registration Successful!",
        text: "Redirecting to login...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
  
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
    }
  };
  

// ✅ تسجيل الدخول
// export const loginUser = (email, password) => async (dispatch) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // ✅ جلب بيانات المستخدم من Firebase
//     const userRef = ref(database, `users/${user.uid}`);
//     const snapshot = await get(userRef);

//     if (!snapshot.exists()) {
//       throw new Error("User data not found in database.");
//     }

//     const userData = snapshot.val();

//     dispatch({
//       type: "auth/loginSuccess",
//       payload: { uid: user.uid, fullName: userData.fullName, email: userData.email, phone: userData.phone },
//     });

//     Swal.fire({
//       title: "Login Successful!",
//       text: "Redirecting to dashboard...",
//       icon: "success",
//       timer: 2000,
//       showConfirmButton: false,
//     });

//   } catch (error) {
//     Swal.fire("Error!", error.message, "error");

//     dispatch({
//       type: "auth/loginFailure",
//       payload: error.message,
//     });
//   }
// };

export const loginUser = ({ email, password }) => async (dispatch) => {
    dispatch({ type: "auth/loginRequest" });
  
    try {
      // 🔹 تسجيل الدخول في Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // 🔹 جلب بيانات المستخدم من Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
  
      if (!snapshot.exists()) {
        throw new Error("User data not found in database.");
      }
  
      const userData = snapshot.val();
  
      // ✅ تحديث حالة المستخدم في Redux
      dispatch({
        type: "auth/loginSuccess",
        payload: { 
          uid: user.uid, 
          fullName: userData.fullName, 
          email: userData.email, 
          phone: userData.phone 
        },
      });
  
      // ✅ إشعار للمستخدم
      Swal.fire({
        title: "Login Successful!",
        text: "Redirecting to dashboard...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
  
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
    }
  };

// ✅ تعريف الـ Slice وإضافة Reducers
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
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
    },
    signUpFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    googleSignUpSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    googleSignUpFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
