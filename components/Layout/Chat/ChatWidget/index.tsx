import React from 'react';
import styled from '@emotion/styled';
import { RootStore } from '../../../../stores';
import useStores from '../../../../stores/useStores';
import ChatRoom from './ChatRoom';
import ChatLobby from './ChatLobby';

const ChatWidget = () => {
  const { SignStore } = useStores() as RootStore;
  const { userData } = SignStore;
  return (
    <Wrapper>
      {(userData && userData.adminFl) ? <ChatRoom /> : <ChatLobby />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 400px;
`;

export default ChatWidget;
