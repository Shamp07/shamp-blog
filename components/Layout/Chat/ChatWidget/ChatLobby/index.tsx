import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import ChatRoom from './ChatRoom';

const ChatLobby = () => {
  const { chatStore } = stores();
  const { chatRoomList } = chatStore;

  return (
    <>
      {chatRoomList.map((data) => <ChatRoom key={data.id} data={data} />)}
    </>
  );
};

export default observer(ChatLobby);
