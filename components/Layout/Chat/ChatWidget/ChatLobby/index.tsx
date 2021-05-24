import React from 'react';
import { observer } from 'mobx-react-lite';

import useStores from '@stores/useStores';
import ChatRoom from './ChatRoom';

const ChatLobby = () => {
  const { ChatStore } = useStores();
  const { chatRoomList } = ChatStore;

  return (
    <>
      {chatRoomList.map((data) => <ChatRoom key={data.id} data={data} />)}
    </>
  );
};

export default observer(ChatLobby);
