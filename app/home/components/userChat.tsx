'use client';

import { UserChatProfile } from './userChatProfile';
import { ChatComponent } from './chatComponent';
import { SendMessageBar } from './sendMessageBar';

export const UserChat = ({ socketInstance }: { socketInstance: object }) => {
  return (
    <div className="w-[full]">
      <UserChatProfile />
      <ChatComponent />
      <SendMessageBar socketInstance={socketInstance} />
    </div>
  );
};
