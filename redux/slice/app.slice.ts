import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSearchBarOpened: false,
  currentUserFriendList: [],
  currentUserProfile: {},
  searchedPeople: [],
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setSearchBarOpen: (state, action) => {
      state.isSearchBarOpened = action.payload;
    },
    setCurrentUserFriendList: (state, action) => {
      state.currentUserFriendList = action.payload;
    },
    setCurrentProfile: (state, action) => {
      state.currentUserProfile = action.payload;
    },
    setSearchedPeople: (state, action) => {
      state.searchedPeople = action.payload;
    },
  },
});

export const {
  setSearchBarOpen,
  setCurrentUserFriendList,
  setCurrentProfile,
  setSearchedPeople,
} = appSlice.actions;
export default appSlice.reducer;
