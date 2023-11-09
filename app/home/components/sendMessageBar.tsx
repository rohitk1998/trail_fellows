'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { setSendMessageState } from '@/redux/slice/chat.slice';
import Image from 'next/image';
import Send from '../../../public/send.png';

export const SendMessageBar = ({ socketInstance }: { socketInstance: any }) => {
  const dispatch: any = useDispatch();

  const { currentUserChat, selectedChatUser } = useSelector(
    (state: any) => state.chat
  );
  const { currentUserProfile } = useSelector((state: any) => state.app);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  }: {
    formState: any;
    control: any;
    handleSubmit: any;
    reset: any;
  } = useForm();

  const onSubmit = (data: any) => {
    let toUserId =
      currentUserProfile.userId === selectedChatUser.toUserId
        ? selectedChatUser.fromUserId
        : selectedChatUser.toUserId;
    dispatch(setSendMessageState('loading'));
    console.log("data.message.length",data.message , typeof data.message);
    
    if (data.message) {
      socketInstance.emit(
        'message',
        {
          data: {
            toUserId: toUserId,
            message: data.message,
            requestId: selectedChatUser.requestId,
            type: 'MESSAGE',
          },
          listener: 'message',
        },
        () => {
          console.log('SEND');
        }
      );
    }
    reset({ message: '' });
  };

  useEffect(() => {
    console.log('currentUserChat', currentUserChat);
  }, [currentUserChat]);

  return (
    <div className="w-[100%] bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center"
      >
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <input
              className="border-t-[1px] border-b-[1px] h-[70px] outline-offset-0 px-3 outline-none w-[100%]"
              type="text"
              placeholder="Type Your Message ..."
              {...field}
              autoComplete="off"
            />
          )}
        />
        <button
          type="submit"
          className="w-[30%] h-[70px] bg-white text-blue-600 border-t-[1px] border-b-[1px] flex justify-end items-center pr-10"
        >
          <Image src={Send} alt="" className="w-[45px] h-[40px]" />
        </button>
      </form>
    </div>
  );
};
