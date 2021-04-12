import React from 'react';
import styled from '@emotion/styled';
import ReceiveMessage from './ReceiveMessage';
import SendMessage from './SendMessage';

const Content = () => (
  <Wrapper>
    <ChatDate>오늘</ChatDate>
    <ReceiveMessage />
    <SendMessage />
  </Wrapper>
);

const Wrapper = styled.article`
  background-color: #fff;
  height: 600px;
  box-shadow: rgb(81 99 120 / 30%) 0 6px 60px 0;
`;

const ChatDate = styled.div`
  padding: 16px 14px 0;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: rgb(167, 167, 170);
`;

export default Content;
