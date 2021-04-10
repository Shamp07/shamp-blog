import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import Fab from '@material-ui/core/Fab';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';
import ChatWidget from './ChatWidget';

const Chat = () => {
  const { ChatStore } = useStores() as RootStore;
  const { openChat, isChatOpen } = ChatStore;
  return (
    <Wrapper>
      {isChatOpen && <ChatWidget />}
      <ButtonWrapper onClick={openChat}>
        <span>질문하기!</span>
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
