'use client';

import { useSelector } from "react-redux";

export const UserChatProfile = () => {
    const { selectedChatUser } = useSelector(
        (state: any) => state.chat
      );

      const { currentUserProfile } = useSelector((state : any )=> state.app)
    
  return (
    <div
      className={`w-[100%] p-3 border-b-[1px]`}
    >
      <div className="flex justify-between items-center">
        <div className="w-[25%] h-[40px] flex items-start justify-start">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src="https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact Image"
          />
        </div>
        <div className="w-[75%] h-[40px] flex items-center justify-start">
          <div className="px-4 py-2">
            <h2 className={`text-gray-800 text-sm font-normal`}>
            {currentUserProfile.userId == selectedChatUser.toUserId
                ? selectedChatUser.fromUserName
                : currentUserProfile.userId == selectedChatUser.fromUserId
                ? selectedChatUser.toUserName
                : ''}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
