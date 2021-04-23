import styled from '@emotion/styled';
import React from 'react';
import { ChatType } from '../../../../../stores/ChatStore';

interface ReceiveMessageProps {
  data: ChatType;
}

const ReceiveMessage = ({ data }: ReceiveMessageProps) => {
  const { fromUserName, message, time } = data;
  return (
    <Wrapper>
      <Profile>
        <ProfileImage />
      </Profile>
      <MessageWrapper>
        <NameAndTime>
          <div>{fromUserName}</div>
          <div>{time}</div>
        </NameAndTime>
        <MessageContentWrapper>
          <MessageContentInner>
            <div>
              {message}
            </div>
          </MessageContentInner>
        </MessageContentWrapper>
      </MessageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 13px;
  display: flex;
`;

const Profile = styled.div`
  width: 40px;
  padding-left: 10px;
`;

const ProfileImage = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url("/logo_profile.png");
  background-size: cover;
  background-position: center center;
  background-color: rgb(255, 255, 255);
  box-shadow: none;
`;

const MessageWrapper = styled.div`
  flex: 1 1 0;
  overflow: hidden;
`;

const NameAndTime = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 4px 20% 4px 0;
  color: rgb(36, 36, 40);
  
  & > div:first-of-type {
    flex: 0 1 auto;
    font-size: 13px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  & > div:last-of-type {
    margin-left: 7px;
    font-size: 11px;
    color: rgb(167, 167, 170);
  }
`;

const MessageContentWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const MessageContentInner = styled.div`
  max-width: 280px;
  padding: 10px;
  border-radius: 12px;
  background-color: rgb(240, 240, 241);
  color: rgb(36, 36, 40);
  
  & > div {
    max-width: 300px;
    line-height: 20px !important;
    font-size: 15px !important;
    font-weight: normal !important;
  }
`;

export default ReceiveMessage;
