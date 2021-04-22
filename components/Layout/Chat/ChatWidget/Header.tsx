import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RootStore } from '../../../../stores';
import useStores from '../../../../stores/useStores';

const Header = () => {
  const { ChatStore } = useStores() as RootStore;
  const { chatPage, moveChatPage } = ChatStore;

  return (
    <HeaderWrapper>
      {chatPage === 1 && (
        <button type="button" onClick={() => moveChatPage(0, 0)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      {chatPage === 0 ? '채팅 방 목록' : ' 님 과의 채팅'}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  height: 30px;
  text-align: center;
  padding: 10px;
  line-height: 30px;
  border-bottom: 1px solid #e6e6e6;
  background: linear-gradient(94deg, #2d79c7, #52a7ff);
  color: #fff;

  & > button {
    position: absolute;
    top: 14px;
    left: 15px;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    border: 0;
    color: white;
    width: 20px;
    height: 20px;
    
    &:focus {
      outline: 0;
    }
  }
  
  & > button > svg {
    width: 20px;
  }
`;

export default observer(Header);
