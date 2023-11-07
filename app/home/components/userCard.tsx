'use client';

import { setChatUser, setChatUserSelected } from '@/redux/slice/chat.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const UserCard = ({ item }: { item: any }) => {
  const { ischatUserSelected, selectedChatUser } = useSelector(
    (state: any) => state.chat
  );
  const { currentUserProfile } = useSelector((state: any) => state.app);

  const dispatch = useDispatch();
  const handleChatUserSelection = (item: any) => {
   if(ischatUserSelected){
    dispatch(setChatUser({}));
    dispatch(setChatUserSelected(false));
   }
   else{
    dispatch(setChatUser(item));
    dispatch(setChatUserSelected(true));
   }
  };

  useEffect(() => {
    console.log(
      'ischatUserSelected, selectedChatUser',
      'currentUserProfile',
      ischatUserSelected,
      selectedChatUser,
      currentUserProfile
    );
  }, [ischatUserSelected]);

  return (
    <div
      className={`w-[90%] mt-2 p-3 border-[1px] mx-auto rounded-lg ${
        selectedChatUser.id == item.id ? 'bg-black' : ''
      }`}
      onClick={() => handleChatUserSelection(item)}
    >
      <div className="flex justify-between items-center">
        <div className="w-[25%] h-[40px] flex items-start justify-start">
          {item.onlineStatus == true ? (
            <div className="bg-green-400 w-[10px] h-[10px] rounded-full"></div>
          ) : (
            <div className="bg-gray-300 w-[10px] h-[10px] rounded-full"></div>
          )}
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src="https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact Image"
          />
        </div>
        <div className="w-[75%] h-[40px] flex items-center justify-start">
          <div className="px-4 py-2">
            <h2
              className={`${
                selectedChatUser.id == item.id ? 'text-white' : 'text-gray-600'
              } text-sm font-normal`}
            >
              {currentUserProfile.userId == item.toUserId
                ? item.fromUserName
                : currentUserProfile.userId == item.fromUserId
                ? item.toUserName
                : ''}
            </h2>
            <p
              className={`${
                selectedChatUser.id == item.id ? 'text-white' : 'text-gray-600'
              } text-sm`}
            >
              {item.dpStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
