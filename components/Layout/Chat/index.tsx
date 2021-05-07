import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import Fab from '@material-ui/core/Fab';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import ChatWidget from './ChatWidget';
import { RootStore } from '../../../stores';

const Chat = () => {
  const { ChatStore, SignStore } = useStores() as RootStore;
  const { userData } = SignStore;
  const { openChat, isChatOpen, notReadChatCount } = ChatStore;

  return (
    <Wrapper>
      {isChatOpen && <ChatWidget />}
      <ButtonWrapper onClick={() => openChat(!!userData, !!userData?.adminFl)}>
        <span>{(userData && userData.adminFl) ? '채팅하기' : '질문하기'}</span>
        {!!notReadChatCount && <div>{notReadChatCount}</div>}
        <ChatFloatButton color="primary" aria-label="add">
          <FontAwesomeIcon icon={faCommentDots} />
        </ChatFloatButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-weight: bold;
  box-shadow: rgb(0 0 0 / 12%) 0 3px 12px 0;
  height: 56px;
  width: 150px;
  border-radius: 28px;
  background-color: #fff;
  position: fixed !important;
  bottom: 30px;
  right: 30px;
  display: flex;
  z-index: 100;
  
  & > div > span {
    line-height: 56px;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  
  & > div {
    position: absolute;
    text-align: center;
    background-color: rgb(255, 84, 66);
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    line-height: 20px;
    right: -3px;
    top: -3px;
    z-index: 10;
    font-size: 10px;
  }
`;

const ChatFloatButton = styled(Fab)`
  color: #fff;
  margin-left: auto !important;
  cursor: pointer;

  & > span:first-of-type {
    z-index: 100;

    & > svg {
      width: 25px;
      height: 25px;
    }
  }

  & > span:last-of-type {
    background-image: linear-gradient(94deg, #2d79c7, #52a7ff);
  }
`;

export default observer(Chat);
