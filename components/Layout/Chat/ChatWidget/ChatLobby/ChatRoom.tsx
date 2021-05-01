import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { ChatRoomType } from '../../../../../stores/ChatStore';
import { RootStore } from '../../../../../stores';
import useStores from '../../../../../stores/useStores';

interface ChatRoomProps {
  data: ChatRoomType;
}

const ChatRoom = ({ data }: ChatRoomProps) => {
  const { SignStore, ChatStore } = useStores() as RootStore;
  const { userData } = SignStore;
  const { moveChatPage } = ChatStore;

  if (!userData) return null;

  const { id } = userData;
  const {
    fromUserId, toUserId,
    toUserName, fromUserName,
    message, time,
  } = data;
  const otherUserId = fromUserId === id ? toUserId : fromUserId;

  return (
    <ChatRoomWrapper onClick={() => moveChatPage(1, otherUserId)}>
      <Profile>
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Profile>
      <ChatRoomContent>
        <div>{fromUserId === id ? toUserName : fromUserName}</div>
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
  padding: 15px 15px;
  
  & > div {
    width: 30px;
    height: 30px;
    padding: 5px;
    background-color: #2d79c7;
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
  flex: 1 1 0;
  min-width: 180px;
  font-size: 13px;
  color: rgb(36, 36, 40);
  height: 40px;
  padding: 15px 8px 15px 0;
  
  & > div {
    overflow: hidden;
  }
  
  & > div:first-of-type {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
    line-height: 16px;
    height: 16px;
  }
  
  & > div:last-of-type {
    margin-top: 4px;
    line-height: 20px;
    word-break: break-all;
    white-space: pre-line;
    font-weight: normal;
    height: 20px;
    color: inherit;
  }
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
