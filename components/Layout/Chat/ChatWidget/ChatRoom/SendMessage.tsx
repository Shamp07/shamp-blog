import React from 'react';
import styled from '@emotion/styled';
import { ChatType } from '../../../../../stores/ChatStore';

interface SendMessageProps {
  data: ChatType;
}

const SendMessage = ({ data }: SendMessageProps) => {
  const { message, time } = data;

  return (
    <MessageWrapper>
      <Time>{time}</Time>
      <MessageContentWrapper>
        <MessageContentInner>
          <div>
            {message}
          </div>
        </MessageContentInner>
      </MessageContentWrapper>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  padding-right: 12px;
  text-align: right;
  color: rgb(36, 36, 40);
`;

const Time = styled.div`
  display: block;
  font-size: 11px;
  margin: 10px 0 4px;
  color: rgb(167, 167, 170);
`;

const MessageContentWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin-bottom: 4px;
`;

const MessageContentInner = styled.div`
  max-width: 280px;
  padding: 10px;
  border-radius: 12px;
  background-color: #2d79c7;
  color: white;
  
  & > div {
    max-width: 300px;
    line-height: 20px !important;
    font-size: 15px !important;
    font-weight: normal !important;
  }
`;

export default SendMessage;