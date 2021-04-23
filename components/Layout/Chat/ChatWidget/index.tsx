import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../../../../stores';
import useStores from '../../../../stores/useStores';
import ChatRoom from './ChatRoom';
import ChatLobby from './ChatLobby';
import Header from './Header';
import ChatSpinner from './ChatSpinner';

const ChatWidget = () => {
  const { ChatStore } = useStores() as RootStore;
  const { chatPage, isChatLoading } = ChatStore;

  const ChatPage = chatPage === 0 ? <ChatLobby /> : <ChatRoom />;
  return (
    <Wrapper>
      <Header />
      {isChatLoading ? <ChatSpinner /> : ChatPage}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 120px;
  width: 400px;
  height: 700px;
  background-color: #fff;
  box-shadow: rgb(81 99 120 / 30%) 0 6px 60px 0;
  border-radius: 16px;
`;

export default observer(ChatWidget);
