import React from 'react';
import styled from '@emotion/styled';
import { RootStore } from '../../../stores';
import useStores from '../../../stores/useStores';

const ChatWidget = () => {
  const { ChatStore } = useStores() as RootStore;
  const { text } = ChatStore;
  return (
    <Wrapper>
      <Header>
        Shamp 님과의 채팅
      </Header>
      <Content />
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
  background-color: #fff;
  border-radius: 30px;
`;

const Header = styled.header`
  height: 30px;
  text-align: center;
  padding: 10px;
  line-height: 30px;
  border-bottom: 1px solid #e6e6e6;
`;

const Content = styled.article`
  height: 500px;
`;

const Footer = styled.footer`

`;

export default ChatWidget;
