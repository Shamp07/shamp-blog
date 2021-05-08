import styled from '@emotion/styled';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ChatType } from '../../../../../stores/ChatStore';

interface ReceiveMessageProps {
  data: ChatType;
}

const ReceiveMessage = ({ data }: ReceiveMessageProps) => {
  const {
    fromUserName, message, time, displayedTime,
    fromUserId,
  } = data;

  return (
    <Wrapper isFull={!!displayedTime}>
      <Profile>
        {displayedTime && (
        <>
          {
                fromUserId === 0 ? <ProfileImage />
                  : (
                    <OtherProfile>
                      <div>
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                    </OtherProfile>
                  )
              }
        </>
        )}
      </Profile>
      <MessageWrapper>
        {displayedTime && (
          <NameAndTime>
            <div>{fromUserName}</div>
            <div>{time}</div>
          </NameAndTime>
        )}
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

interface WrapperProps {
  isFull: boolean
}

const Wrapper = styled.div<WrapperProps>`
  margin-top: ${(props) => (props.isFull ? '12px' : '5px')};
  display: flex;
`;

const Profile = styled.div`
  width: 40px;
  padding-left: 10px;
`;

const OtherProfile = styled.div`
  & > div {
    width: 25px;
    height: 25px;
    padding: 5px;
    background-color: #2d79c7;
    border-radius: 25px;
    color: #fff;
  }

  & svg {
    width: 15px;
    height: 15px;
    padding: 5px;
  }
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
