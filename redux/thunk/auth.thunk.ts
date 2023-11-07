import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCountryList, setUserToken } from '../slice/auth.slice';
import { toast } from 'react-toastify';

const userBaseUrl = process.env.REACT_APP_LOCAL_AUTH_API_URL;

export const fetchCountryList = createAsyncThunk(
  'authSlice',
  async (apiEndpoint, { dispatch }) => {
    try {
      const response = await fetch(
        'http://10.10.1.26:3001/v1/trailFellows/user/countryList'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setCountryList(data?.response?.data?.data));
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const registerNewUser = createAsyncThunk(
  'authSlice/reisterUser',
  async ({ payload }: { payload: any }, { dispatch }) => {
    try {
      const response = await fetch(
        'http://10.10.1.26:3001/v1/trailFellows/user/registration',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw data.response.data[0].message;
      } else {
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
      }
    } catch (error: any) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'authSlice/loginUser',
  async ({ payload }: { payload: any }, { dispatch }) => {
    try {
      const response = await fetch(
        'http://10.10.1.26:3001/v1/trailFellows/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw data.response.data[0].message;
      } else {
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

        dispatch(setUserToken(data.response.data?.data));
      }
    } catch (error: any) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      throw error;
    }
  }
);
