import React from 'react';
import styled from '@emotion/styled';
import { RootStore } from '../../../../stores';
import useStores from '../../../../stores/useStores';
import Footer from './Footer';

const ChatWidget = () => {
  const { ChatStore } = useStores() as RootStore;
  return (
    <Wrapper>
      <Header>
        Shamp 님 과의 채팅
      </Header>
      <Content>
        <ChatDate>
          오늘
        </ChatDate>
      </Content>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 120px;
  width: 400px;
  height: 700px;
`;

const Header = styled.header`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  height: 30px;
  text-align: center;
  padding: 10px;
  line-height: 30px;
  border-bottom: 1px solid #e6e6e6;
  background: linear-gradient(94deg, #2d79c7, #52a7ff);
  box-shadow: rgb(81 99 120 / 30%) 0 6px 60px 0;
  color: #fff;
`;

const Content = styled.article`
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

export default ChatWidget;
