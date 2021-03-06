import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import useStores from '@stores/useStores';
import * as T from '@types';

const Header = () => {
  const { ChatStore, SignStore } = useStores();
  const { chatPage, moveChatPage, toUserName } = ChatStore;
  const { userData } = SignStore;

  return (
    <HeaderWrapper>
      {(chatPage === T.ChatPage.ROOM && userData?.adminFl) && (
        <button type="button" onClick={() => moveChatPage(T.ChatPage.LOBBY, 0, toUserName)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      {chatPage === T.ChatPage.LOBBY ? '채팅 방 목록' : `${toUserName} 님 과의 채팅`}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  height: 30px;
  text-align: center;
  padding: 10px;
  line-height: 30px;
  border-bottom: 1px solid #e6e6e6;
  background: linear-gradient(94deg, #2d79c7, #52a7ff);
  color: #fff;

  & > button {
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: white;
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 15px;
    transition: background-color 0.2s;
    line-height: 28px;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    &:focus {
      outline: 0;
    }
  }
  
  & > button > svg {
    line-height: 30px;
    width: 15px;
  }
`;

export default observer(Header);
