import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import Fab from '@material-ui/core/Fab';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

const Chat = () => {
  const { ChatStore } = useStores() as RootStore;
  const { openChat, isChatOpen } = ChatStore;
  return (
    <div>
      {isChatOpen && <ChatWidget />}
      <ChatFloatButton color="primary" aria-label="add" onClick={openChat}>
        <FontAwesomeIcon icon={faCommentDots} />
      </ChatFloatButton>
    </div>
  );
};

const ChatWidget = styled.div`
  position: fixed;
  right: 30px;
  bottom: 120px;
  width: 400px;
  height: 700px;
  background-color: #fff;
  border-radius: 30px;
`;

const ChatFloatButton = styled(Fab)`
  position: fixed !important;
  bottom: 30px;
  right: 30px;
  color: #fff;

  & > span:first-of-type {
    z-index: 100;

    & > svg {
      width: 25px;
      height: 25px;
    }
  }

  & > span:last-of-type {
    background-color: #2d79c7 !important;
  }
`;

export default observer(Chat);
