import React from 'react';
import styled from '@emotion/styled';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatLobby = () => (
  <Wrapper>
    <ChatRoomWrapper>
      <Profile>
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Profile>
      <ChatRoomContent>
        <div>유저 이름</div>
        <div>질문이 있습니다!</div>
      </ChatRoomContent>
      <ChatRoomDate>
        <div>4/10</div>
      </ChatRoomDate>
    </ChatRoomWrapper>
  </Wrapper>
);

const Wrapper = styled.article`
  background-color: #fff;
  height: 656px;
  box-shadow: rgb(81 99 120 / 30%) 0 6px 60px 0;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
`;

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

export default ChatLobby;
