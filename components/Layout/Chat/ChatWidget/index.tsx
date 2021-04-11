import React from 'react';
import styled from '@emotion/styled';
import { RootStore } from '../../../../stores';
import useStores from '../../../../stores/useStores';
import Content from './Content';
import Footer from './Footer';

const ChatWidget = () => {
  const { ChatStore } = useStores() as RootStore;
  return (
    <Wrapper>
      <Header>
        Shamp 님 과의 채팅
      </Header>
      <Content />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 400px;
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





export default ChatWidget;
