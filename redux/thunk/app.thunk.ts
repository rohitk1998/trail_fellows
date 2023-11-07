import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCurrentProfile,
  setCurrentUserFriendList,
} from '../slice/app.slice';
import { getState } from '../store';

const userBaseUrl = process.env.REACT_APP_LOCAL_AUTH_API_URL;

export const fetchFriendList = createAsyncThunk(
  'authSlice/friendList',
  async (apiEndpoint, { dispatch }) => {
    try {
      const userToken = getState().auth.userToken;
      const response = await fetch(
        'http://10.10.1.26:3001/v1/trailFellows/user/friendList',
        {
          headers: {
            'api-access-token': userToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setCurrentUserFriendList(data?.response?.data?.data));
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'authSlice/userProfile',
  async (apiEndpoint, { dispatch }) => {
    try {
      const userToken = getState().auth.userToken;
      const response = await fetch(
        'http://10.10.1.26:3001/v1/trailFellows/user/userProfile',
        {
          headers: {
            'api-access-token': userToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setCurrentProfile(data?.response?.data?.data));
      return data;
    } catch (error) {
      throw error;
    }
  }
);
