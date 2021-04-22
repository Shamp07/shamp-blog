import React from 'react';
import { observer } from 'mobx-react-lite';
import ChatRoom from './ChatRoom';
import { RootStore } from '../../../../../stores';
import useStores from '../../../../../stores/useStores';

const ChatLobby = () => {
  const { ChatStore } = useStores() as RootStore;
  const { chatRoomList } = ChatStore;
  return (
    <>
      {chatRoomList.map((data) => <ChatRoom key={data.id} data={data} />)}
    </>
  );
};

export default observer(ChatLobby);
