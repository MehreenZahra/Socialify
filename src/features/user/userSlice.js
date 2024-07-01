import { createSlice } from '@reduxjs/toolkit';

const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const validatePassword = (password) => password.length >= 6;

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
    validateSignup: (state, action) => {
      const { email, password, confirmPassword } = action.payload;
      state.emailError = validateEmail(email) ? '' : 'Invalid email';
      state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
      state.confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
    },
  },
});

export const { login, logout, validateLogin, validateSignup } = userSlice.actions;
export default userSlice.reducer;
