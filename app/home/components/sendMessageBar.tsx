'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { setSendMessageState } from '@/redux/slice/chat.slice';

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
    reset 
  }: { formState: any; control: any; handleSubmit: any,reset : any  } = useForm();

  const onSubmit = (data: any) => {
    let toUserId =
      currentUserProfile.userId === selectedChatUser.toUserId
        ? selectedChatUser.fromUserId
        : selectedChatUser.toUserId;
    dispatch(setSendMessageState('loading'));
    socketInstance.emit(
      'message',
      {
        data: {
          toUserId: toUserId,
          message: data.message,
          type: 'MESSAGE',
        },
        listener: 'message',
      },
      () => {
        console.log('SEND');
      }
    );
    reset({ message : '' })
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
              className="border-t-[1px] border-b-[1px] h-[40px] outline-offset-0 px-3 outline-none w-[100%]"
              type="text"
              placeholder="Type Your Message ..."
              {...field}
            />
          )}
        />
        <button
          type="submit"
          className="w-[30%] h-[40px] bg-white text-blue-600 border-t-[1px] border-b-[1px]"
        >
          Send
        </button>
      </form>
    </div>
  );
};
