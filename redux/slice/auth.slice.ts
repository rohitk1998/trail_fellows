import { createSlice } from '@reduxjs/toolkit';
import { registerNewUser } from '../thunk/auth.thunk';

const initialState  = {
  registerObj : {},
  isOtpVerified : false , 
  countryList : [{ ctryBDesc : 'Select Country' , ctryCode : ''}],
  status : 'initial',
  error : '',
  userToken : ''
};

const authSlice  = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setRegisterObj : (state , action ) => {
      state.registerObj  = action.payload
    },
    setOtpVerified : (state, action ) => {
      state.isOtpVerified = action.payload
    },
    setCountryList : (state, action ) => {
      state.countryList = [...state.countryList , ...action.payload]
    },
    setUserToken : (state, action ) => {
      state.userToken = action.payload
    },
  }
});

export const { setRegisterObj,setOtpVerified,setCountryList,setUserToken } = authSlice.actions;
export default authSlice.reducer;
