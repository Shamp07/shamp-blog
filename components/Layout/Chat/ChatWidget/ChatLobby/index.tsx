import React from 'react';
import styled from '@emotion/styled';
import ChatRoom from './ChatRoom';
import { RootStore } from '../../../../../stores';
import useStores from '../../../../../stores/useStores';

const ChatLobby = () => {
  const { ChatStore } = useStores() as RootStore;
  const { chatRoomList } = ChatStore;
  return (
    <Wrapper>
      {chatRoomList.map((data) => <ChatRoom data={data} />)}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background-color: #fff;
  height: 656px;
  box-shadow: rgb(81 99 120 / 30%) 0 6px 60px 0;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
`;

export default ChatLobby;
