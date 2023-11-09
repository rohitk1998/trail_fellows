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
import { getChathistory } from '@/redux/thunk/chat.thunk';

const URL: any = 'http://10.10.1.26:7000';

export default function Home() {
  const { ischatUserSelected, selectedChatUser, currentUserChat } = useSelector(
    (state: any) => state?.chat
  );
  const { userToken } = useSelector((state: any) => state.auth);

  const { currentUserProfile } = useSelector((state: any) => state.app);

  const dispatch: any = useDispatch();

  const socket = io(URL, {
    extraHeaders: {
      'api-access-token': userToken,
      'Access-Control-Allow-Origin': '*',
    },
  });

  useEffect(() => {
    dispatch(fetchFriendList());
    dispatch(fetchUserProfile());

    let chatArr = [...currentUserChat];

    // let chatArr: any = [];

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

  useEffect(() => {
    if (ischatUserSelected) {
      console.log('selectedChatUser', selectedChatUser);
      let requestId = selectedChatUser.requestId
      dispatch(getChathistory({ requestId : requestId, limit: '10', offset: '0' }));
    }
  }, [ischatUserSelected]);

  return (
    <MainLayout>
      <div className="w-[100%] max-h-screen flex">
        <div className="2xl:w-[15%] lg:w-[15%] md:w-[35%] sm:w-[35%] sm:block md:block lg:block xl:block hidden border-r-[1px]">
          <UserListing />
        </div>
        <div className="2xl:w-[70%] lg:w-[70%] md:w-[65%] sm:w-[65%] w-[100%] border-r-[1px]">
          {ischatUserSelected ? (
            <UserChat socketInstance={socket} />
          ) : (
            <UserProfile />
          )}
        </div>
        <div className="2xl:w-[15%] lg:w-[15%] md:w-0 sm:w-[0%] w-0 border-r-[1px] 2xl:block lg:block hidden">
          <UserSettings />
        </div>
      </div>
    </MainLayout>
  );
}
