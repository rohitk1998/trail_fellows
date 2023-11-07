import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ischatUserSelected: false,
  selectedChatUser: {},
  currentUserChat: [],
  sendMessageState:'initial'
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setChatUserSelected: (state, action) => {
      state.ischatUserSelected = action.payload;
    },
    setChatUser: (state, action) => {
      state.selectedChatUser = action.payload;
    },
    setUserChat: (state, action) => {
      state.currentUserChat = action.payload;
    },
    setSendMessageState: (state, action) => {
      state.sendMessageState = action.payload;
    },
  },
});

export const { setChatUserSelected, setChatUser, setUserChat,setSendMessageState } =
  chatSlice.actions;
export default chatSlice.reducer;
