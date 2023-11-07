'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import Girl from '../../../public/girl.jpg';
import Avatar from '../../../public/profile.svg';
import { useEffect, useRef } from 'react';

export const ChatComponent = () => {
  const bottomEl: any = useRef(null);
  const { currentUserChat, selectedChatUser } = useSelector(
    (state: any) => state.chat
  );
  const { sendMessageState } = useSelector((state: any) => state.chat);

  useEffect(() => {
    console.log('currentUserChat', currentUserChat);
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentUserChat]);

  useEffect(() => {
    console.log('sendMessageState', sendMessageState);
  }, [sendMessageState]);

  return (
    <div className="flex-grow overflow-y-scroll max-h-[60vh] cursor-all-scroll">
      {Array.isArray(currentUserChat) &&
        currentUserChat.map((chat: any) => {
          return (
            <div className="flex flex-col space-y-2 p-4">
              {chat.fromUserId == selectedChatUser.userId ? (
                <div className="self-end flex justify-start items-center gap-2">
                  <div className="bg-black rounded-lg p-2 shadow-md">
                    <p className="text-sm text-white">{chat?.message}</p>
                  </div>
                  <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <Image
                      src={Avatar}
                      alt=""
                      className="object-fill rounded-full overflow-hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="self-start flex justify-start items-center gap-2">
                  <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <Image
                      src={Girl}
                      alt=""
                      className="object-fill rounded-full"
                    />
                  </div>
                  <div className="bg-white border-[1px] rounded-lg p-2 shadow-md">
                    <p className="text-sm text-gray-600">{chat.message}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      <div ref={bottomEl}></div>
    </div>
  );
};
