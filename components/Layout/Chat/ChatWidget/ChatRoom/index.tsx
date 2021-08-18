import React, {useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import Footer from './Footer';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';
import { Chat } from '@types';

const ChatRoom = () => {
  const { ChatStore, SignStore } = stores();
  const { displayedChatList, setScrollRef } = ChatStore;
  const { userData } = SignStore;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollRef(scrollRef);
  }, [setScrollRef, scrollRef])

  return (
    <>
      <ChatListWrapper ref={scrollRef}>
        {displayedChatList.map((data: Chat) => (
          data.fromUserId === userData?.id ?
            <SendMessage key={data.id} data={data} /> : <ReceiveMessage key={data.id} data={data} />))
        }
      </ChatListWrapper>
      <Footer />
    </>
  );
};

const ChatListWrapper = styled.div`
  overflow-y: auto;
  padding: 10px 0;
  height: 572px;

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
    background-color: #d6d6d6;
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
