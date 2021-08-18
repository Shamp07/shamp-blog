import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import ChatRoom from './ChatRoom';

const ChatLobby = () => {
  const { ChatStore } = stores();
  const { chatRoomList } = ChatStore;

  return (
    <>
      {chatRoomList.map((data) => <ChatRoom key={data.id} data={data} />)}
    </>
  );
};

export default observer(ChatLobby);
