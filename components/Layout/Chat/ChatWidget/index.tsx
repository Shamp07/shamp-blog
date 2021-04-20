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
  bottom: 100px;
  width: 400px;
`;

export default observer(ChatWidget);
