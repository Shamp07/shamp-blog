import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { ChatRoomType } from '../../../../../stores/ChatStore';
import { RootStore } from '../../../../../stores';
import useStores from '../../../../../stores/useStores';

interface ChatRoomProps {
  data: ChatRoomType
}

const ChatRoom = ({ data }: ChatRoomProps) => {
  const { SignStore, ChatStore } = useStores() as RootStore;
  const { userData } = SignStore;
  const { goChatRoom } = ChatStore;

  if (!userData) return null;

  const { id } = userData;
  const {
    fromUserId, toUserName, fromUserName,
    message, time,
  } = data;

  return (
    <ChatRoomWrapper onClick={goChatRoom}>
      <Profile>
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Profile>
      <ChatRoomContent>
        <div>{fromUserId === id ? fromUserName : toUserName}</div>
        <div>{message}</div>
      </ChatRoomContent>
      <ChatRoomDate>
        <div>{time}</div>
      </ChatRoomDate>
    </ChatRoomWrapper>
  );
};

const ChatRoomWrapper = styled.div`
  height: 70px;
  display: flex;
  cursor: pointer;
  transition: background-color 0.2s ease 0s;
  border-bottom: 1px solid #e6e6e6;
  
  &:hover {
    background-color: #e6e6e6;    
  }
`;

const Profile = styled.div`
  width: 62px;
  padding: 13px 0 0  16px;
  
  & > div {
    width: 30px;
    height: 30px;
    padding: 5px;
    background-color: #e6e6e6;
    border-radius: 25px;
    color: #fff;
  }
  
  & svg {
    width: 20px;
    height: 20px;
    padding: 5px;
  }
  
`;

const ChatRoomContent = styled.div`
  flex: 1 1 0px;
  min-width: 180px;
  padding: 12px 8px 12px 0px;
  font-size: 13px;
  color: rgb(36, 36, 40);
`;

const ChatRoomDate = styled.div`
  position: relative;
  width: 56px;
  
  & > div {
    position: absolute;
    top: 15px;
    right: 14px;
    font-size: 11px;
    color: rgb(167, 167, 170);
    white-space: nowrap;
  }
`;

export default ChatRoom;
