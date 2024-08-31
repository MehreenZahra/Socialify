 import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  filteredUsers: JSON.parse(localStorage.getItem('users')) || [],
  searchQuery: '',
  filterGender: '',
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload; // Initially, filteredUsers is the same as users
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      const filtered = state.users.filter((user) => {
        const nameMatch = user.firstName.toLowerCase().includes(action.payload.toLowerCase());
        const emailMatch = user.email.toLowerCase().includes(action.payload.toLowerCase());
        return nameMatch || emailMatch;
      });
      state.filteredUsers = filtered;
    },
    setFilterGender: (state, action) => {
      state.filterGender = action.payload;
      const filtered = state.users.filter((user) => {
        return action.payload === '' || user.gender === action.payload;
      });
      state.filteredUsers = filtered;
    },
    blockUser: (state, action) => {
      const userId = action.payload;
      const userIndex = state.users.findIndex((user) => user.userId === userId);
      if (userIndex !== -1) {
        state.users[userIndex].isBlocked = true;
        localStorage.setItem('users', JSON.stringify(state.users));
      }   
      return state;
    },
    unblockUser: (state, action) => {
      const userId = action.payload;
      const userIndex = state.users.findIndex((user) => user.userId === userId);
      if (userIndex !== -1) {
        state.users[userIndex].isBlocked = false;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
      return state;
    },
  },
});

export const { setUsers, setSearchQuery, setFilterGender, blockUser, unblockUser} = adminSlice.actions;
export default adminSlice.reducer;