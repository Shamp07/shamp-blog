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
    <>
      <ChatListWrapper>
        {/* <ChatDate>오늘</ChatDate> */}
        {chatList.map((data: ChatType) => (
          data.fromUserId === id ? <SendMessage key={data.id} data={data} /> : <ReceiveMessage key={data.id} data={data} />))}
      </ChatListWrapper>
      <Footer />
    </>
  );
};

const ChatListWrapper = styled.div`
  overflow-y: auto;
  padding: 10px 0;
  height: 582px;


  &::-webkit-scrollbar {
    width: 10px;
    height: 6px;
    background: transparent;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #a6a6a6;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #e6e6e6;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
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
