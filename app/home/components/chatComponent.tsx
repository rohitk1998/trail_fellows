'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import Girl from '../../../public/girl.jpg';
import Avatar from '../../../public/profile.svg';
import { useEffect, useRef } from 'react';

export const ChatComponent = () => {
  const bottomEl: any = useRef(null);
  const { currentUserChat, selectedChatUser, sendMessageState } = useSelector(
    (state: any) => state.chat
  );

  const { currentUserProfile } = useSelector((state: any) => state?.app);

  useEffect(() => {
    console.log('currentUserChat', currentUserChat);
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentUserChat]);

  useEffect(() => {
    console.log('sendMessageState', sendMessageState);
  }, [sendMessageState]);

  return (
    <div className="flex-grow overflow-y-scroll 2xl:max-h-[60vh] xl:max-h-[60vh] lg:max-h-[60vh] md:max-h-screen sm:max-h-screen max-h-screen cursor-all-scroll">
      {Array.isArray(currentUserChat) &&
        currentUserChat.map((chat: any) => {
          return (
            <div className="flex flex-col space-y-2 p-4">
              {chat.senderId == currentUserProfile.userId ? (
                <div className="self-end flex justify-start items-center gap-2">
                  <div className="bg-white rounded-full p-2 shadow-sm border-[1px] border-gray-100">
                    <p className="
                    2xl:text-[14px] lg:text-[14px] md:text-[14px] sm:text-[12px] text-[12px] ml-2 mr-2 text-gray-60
                    ">
                      {chat?.message}
                    </p>
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
                  <div className="w-[40px] h-[40px] rounded-full overflow-hidden ">
                    <Image
                      src={Girl}
                      alt=""
                      className="object-fill rounded-full"
                    />
                  </div>
                  <div className=" bg-black rounded-full p-2 shadow-md">
                    <p className="2xl:text-[14px] lg:text-[14px] md:text-[14px] sm:text-[12px] text-[12px] ml-2 mr-2 text-white">
                      {chat.message}
                    </p>
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
