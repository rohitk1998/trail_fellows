import { createAsyncThunk } from '@reduxjs/toolkit';
import { getState } from '../store';
import { setUserChat } from '../slice/chat.slice';

const userBaseUrl = process.env.REACT_APP_LOCAL_AUTH_API_URL;

export const getChathistory = createAsyncThunk(
  'appSlice/getChatHistory',
  async (
    {
      requestId,
      limit,
      offset,
    }: { requestId: string; limit: string; offset: string },
    { dispatch }
  ) => {
    console.log('sendFriendRequest people api', requestId);
    try {
      const userToken = getState().auth.userToken;
      console.log('userToken', userToken);
      const response = await fetch(
        'http://10.10.1.26:3001/v1/trailFellows/user/getChatHistory',
        {
          method: 'POST',
          headers: {
            'api-access-token': userToken,
            'content-type': 'application/json',
          },
          body: JSON.stringify({ requestId, limit, offset }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("response in get chat history", data);
      
      dispatch(setUserChat(data?.response?.data?.data));
      return data;
    } catch (error) {
      console.log('error', error);

      throw error;
    }
  }
);
