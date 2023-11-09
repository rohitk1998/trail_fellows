import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCurrentProfile,
  setCurrentUserFriendList,
  setSearchedPeople,
} from '../slice/app.slice';
import { getState } from '../store';
import { toast } from 'react-toastify';

const userBaseUrl = process.env.REACT_APP_LOCAL_AUTH_API_URL;

export const fetchFriendList = createAsyncThunk(
  'appSlice/friendList',
  async (apiEndpoint, { dispatch }) => {
    try {
      const userToken : any  = getState().auth.userToken;
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
  'appSlice/userProfile',
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

export const searchPeople = createAsyncThunk(
  'appSlice/searchPeople',
  async ({ payload }: { payload: any }, { dispatch }) => {
    console.log('searching people api', payload);
    try {
      const userToken = getState().auth.userToken;
      console.log('userToken', userToken);
      const response = await fetch(
        'http://10.10.1.26:3001/v1/trailFellows/user/searchFriends',
        {
          method : 'POST',
          headers: {
            'api-access-token': userToken,
            'content-type':'application/json'
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setSearchedPeople(data?.response?.data?.data));
      return data;
    } catch (error) {
      console.log('error', error);

      throw error;
    }
  }
);


export const sendFriendRequest = createAsyncThunk(
  'appSlice/searchPeople',
  async ({ userId , requestType } :  { userId : string , requestType : string  } , { dispatch }) => {
    console.log('sendFriendRequest people api', requestType);
    try {
      const userToken = getState().auth.userToken;
      console.log('userToken', userToken);
      const response = await fetch(
        'http://10.10.1.26:3001/v1/trailFellows/user/friendRequest',
        {
          method : 'POST',
          headers: {
            'api-access-token': userToken,
            'content-type':'application/json'
          },
          body: JSON.stringify({userId , requestType }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success(data.response.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      
      return data;
    } catch (error) {
      console.log('error', error);

      throw error;
    }
  }
);
