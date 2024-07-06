import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const validatePassword = (password) => password.length >= 6;
const initialState = {
  currentUser: undefined,
  isLoading: false,
};

// export const Signup = createAsyncThunk(
//   "user/Signup",
//   async (userData, thunkAPI) => {
//     try {
//       const response = await axios.post("https://api.realworld.io/api/users", {
//         user: userData,
//       });
//       return response.data.user;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );
// export const Login = createAsyncThunk(
//   "user/login",
//   async (userData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "https://api.realworld.io/api/users/login",
//         {
//           user: userData,
//         }
//       );
//       return response.data.user;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );
// export const getCurrentUser = createAsyncThunk(
//   "user/getCurrentUser",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("accessToken") ?? "";
//       const response = await axios.get("https://api.realworld.io/api/user", {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       return response.data.user;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );
// export const Logout = createAsyncThunk("auth/logout", async () => {
//   localStorage.removeItem("accessToken");
// });



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    validateLogin: (state, action) => {
      const { email, password } = action.payload;
      state.emailError = validateEmail(email) ? '' : 'Invalid email';
      state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
    },
    Signup: (state, action) => {
      const { email, password, confirmPassword } = action.payload;
      state.emailError = validateEmail(email) ? '' : 'Invalid email';
      state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
      state.confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
    },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(Signup.pending, (state) => {
    //       state.isLoading = true;
    //     })
    //     .addCase(Signup.fulfilled, (state, action) => {
    //       state.isLoading = false;
    //       state.currentUser = action.payload;
    //     })
    //     .addCase(Signup.rejected, (state) => {
    //       state.isLoading = false;
    //     })
    //     .addCase(login.pending, (state) => {
    //       state.isLoading = true;
    //     })
    //     .addCase(login.fulfilled, (state, action) => {
    //       state.isLoading = false;
    //       state.currentUser = action.payload;
    //     })
    //     .addCase(login.rejected, (state) => {
    //       state.isLoading = false;
    //     })
    //     .addCase(getCurrentUser.pending, (state) => {
    //       state.isLoading = true;
    //     })
    //     .addCase(getCurrentUser.fulfilled, (state, action) => {
    //       state.isLoading = false;
    //       state.currentUser = action.payload;
    //     })
    //     .addCase(getCurrentUser.rejected, (state) => {
    //       state.isLoading = false;
    //       state.currentUser = null;
    //     })
    //     .addCase(logout.fulfilled, (state) => {
    //       state.isLoading = false;
    //       state.currentUser = null;
    //     });
    //   },
  },
});

export const { login, logout, validateLogin, Signup } = userSlice.actions;
export default userSlice.reducer;
