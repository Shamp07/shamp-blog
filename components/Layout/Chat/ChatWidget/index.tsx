import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import * as T from '@types';
import stores from '@stores';
import ChatRoom from './ChatRoom';
import ChatLobby from './ChatLobby';
import ChatSpinner from './ChatSpinner';
import Header from './Header';

const ChatWidget = () => {
  const { ChatStore } = stores();
  const { chatPage, isChatLoading } = ChatStore;

  const ChatPage = chatPage === T.ChatPage.LOBBY ? <ChatLobby /> : <ChatRoom />;
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
