import React, { KeyboardEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCode, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';

import stores from '@stores';

const Footer = () => {
  const { ChatStore, SignStore } = stores();
  const {
    chat, onChangeChat, sendChat, onKeyPressChat,
  } = ChatStore;
  const { userData } = SignStore;

  if (!userData) return null;

  const { id } = userData;

  return (
    <Wrapper>
      <ChatButton type="button">
        <FontAwesomeIcon icon={faLink} />
      </ChatButton>
      <ChatButton>
        <CodeIcon icon={faCode} />
      </ChatButton>
      <ChatInputWrapper>
        <TextAreaCustom
          value={chat}
          onChange={onChangeChat}
          onKeyPress={
            (event: KeyboardEvent<HTMLTextAreaElement>) => onKeyPressChat(event, id)
          }
        />
      </ChatInputWrapper>
      <ChatEnter active={Boolean(chat)} onClick={() => sendChat(id)}>
        <FontAwesomeIcon icon={faCaretRight} />
      </ChatEnter>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  position: static;
  bottom: 0;
  right: 0;
  left: 0;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  z-index: 1;
  transform: translateZ(0px);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  min-height: 54px;
  border-top: 1px solid rgb(228, 228, 229);
  background-color: rgb(255, 255, 255);
  padding: 0 15px;
`;

const TextAreaCustom = styled(TextareaAutosize)`
  padding: 0 10px !important;
  width: 95%;
  overflow: hidden;
  max-height: 100px;
  resize: none;
  line-height: 20px;
  border: 0;
  font-family: inherit;
  font-size: 15px;
  white-space: pre-wrap;
  outline: 0;
`;

const ChatButton = styled.button`
  border: 0;
  background-color: transparent;
  color: #d6d6d6;
  margin-right: 2px;
  height: 22px;
  transition: color 0.2s;
  
  &:hover {
    color: #2d79c7;
  }
  
  & > svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const CodeIcon = styled(FontAwesomeIcon)`
  width: 23px !important;
  height: 20px !important;
`;

const ChatInputWrapper = styled.div`
  width: 100%;
  padding: 18px 0;
  flex: 1 1 0;
  display: flex;
`;

interface ActiveProp {
  active: boolean;
}

const ChatEnter = styled.div<ActiveProp>(({ active }) => ({
  marginLeft: 'auto',
  transition: 'color 0.2s',

  ...(active ? ({
    color: '#2d7927',
    cursor: 'pointer',
    '&:hover': {
      color: '#2d79c7',
    }
  }): ({
    color: '#e6e6e6',
    cursor: 'not-allowed',
  })),

 '& > svg': {
    width: '25px',
    height: '35px',
  },
}));

export default observer(Footer);
