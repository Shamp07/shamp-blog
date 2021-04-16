import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import ReceiveMessage from './ReceiveMessage';
import SendMessage from './SendMessage';
import useStores from '../../../../../stores/useStores';
import { ChatType } from '../../../../../stores/ChatStore';
import { RootStore } from '../../../../../stores';
import Footer from './Footer';

const ChatRoom = () => {
  const { ChatStore, SignStore } = useStores() as RootStore;
  const { chatList } = ChatStore;
  const { userData } = SignStore;

  if (!userData) {
    return null;
  }

  const { id } = userData;

  return (
    <Wrapper>
      <Header>
        Shamp 님 과의 채팅
      </Header>
      <ChatDate>오늘</ChatDate>
      {chatList.map((data: ChatType) => (
        data.fromUserId === id ? <SendMessage data={data} /> : <ReceiveMessage data={data} />))}
      <Footer />
      <ChatRoom />
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background-color: #fff;
  height: 600px;
  box-shadow: rgb(81 99 120 / 30%) 0 6px 60px 0;
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

export default observer(ChatRoom);
