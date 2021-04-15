import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import ReceiveMessage from './ReceiveMessage';
import SendMessage from './SendMessage';
import useStores from '../../../../../stores/useStores';
import { ChatType } from '../../../../../stores/ChatStore';
import { RootStore } from '../../../../../stores';

const Content = () => {
  const { ChatStore, SignStore } = useStores() as RootStore;
  const { chatList } = ChatStore;
  const { userData } = SignStore;

  if (!userData) {
    return null;
  }

  const { id } = userData;

  return (
    <Wrapper>
      <ChatDate>오늘</ChatDate>
      {chatList.map((data: ChatType) => (
        data.fromUserId === id ? <SendMessage data={data} /> : <ReceiveMessage data={data} />))}
    </Wrapper>
  );
};

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

export default observer(Content);
