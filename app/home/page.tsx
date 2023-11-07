'use client';

import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../mainLayout';
import { UserListing } from './components/userListing';
import { UserProfile } from './components/userProfile';
import { UserSettings } from './components/userSetting';
import { UserChat } from './components/userChat';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { setSendMessageState, setUserChat } from '@/redux/slice/chat.slice';
import { fetchFriendList, fetchUserProfile } from '@/redux/thunk/app.thunk';
import { log } from 'util';

export default function Home() {
  const { ischatUserSelected, selectedChatUser, currentUserChat } = useSelector(
    (state: any) => state?.chat
  );
  const { userToken } = useSelector((state: any) => state.auth);

  const state = useSelector((state: any) => state);

  const dispatch: any = useDispatch();

  // "undefined" means the URL will be computed from the `window.location` object
  const URL: any = 'http://10.10.1.26:7000';

  const socket = io(URL, {
    extraHeaders: {
      'api-access-token': userToken,
      'Access-Control-Allow-Origin': '*',
    },
  });

  useEffect(() => {
    dispatch(fetchFriendList());
    dispatch(fetchUserProfile());

    let chatArr = JSON.parse(JSON.stringify(currentUserChat));

    socket.on('connect', () => {
      console.log('SOCKET CONNECTION SUCCESSFUL');
      socket.on('message', (data) => {
        console.log(
          '*** DATA ON REICIEVING MESSAGE FROM SOCKET',
          data,
          data.status
        );
        if (chatArr instanceof Array) {
          dispatch(setSendMessageState('success'));
          chatArr = [...chatArr, data];
        } else {
          console.log('*** else');
        }
        dispatch(setUserChat(chatArr));
      });
    });
    socket.on('disconnect', () => {
      console.log('SOCKET CONNECTION FAILURE');
    });
  }, []);

  console.log('alll states', state);

  return (
    <MainLayout>
      <div className="w-[100%] max-h-screen flex">
        <div className="w-[15%] border-r-[1px]">
          <UserListing />
        </div>
        <div className="w-[70%] border-r-[1px]">
          {ischatUserSelected ? (
            <UserChat socketInstance={socket} />
          ) : (
            <UserProfile />
          )}
        </div>
        <div className="w-[15%] border-r-[1px]">
          <UserSettings />
        </div>
      </div>
    </MainLayout>
  );
}
