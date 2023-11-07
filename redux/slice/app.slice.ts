import { createSlice } from '@reduxjs/toolkit';

const initialState  = {
  isSearchBarOpened : false ,
  currentUserFriendList : [] , 
  currentUserProfile : {}
};

const appSlice  = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setSearchBarOpen : (state , action ) => {
      state.isSearchBarOpened  = action.payload
    },
    setCurrentUserFriendList : ( state , action )=> {
      state.currentUserFriendList = action.payload
    },
    setCurrentProfile : ( state , action )=> {
      state.currentUserProfile = action.payload
    }
  }
});

export const { setSearchBarOpen,setCurrentUserFriendList,setCurrentProfile } = appSlice.actions;
export default appSlice.reducer;
