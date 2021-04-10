import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCode, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import useStores from '../../../../stores/useStores';
import { RootStore } from '../../../../stores';
import { observer } from 'mobx-react-lite';

const Footer = () => {
  const { ChatStore } = useStores() as RootStore;
  const { onHeight, chatHeight } = ChatStore;

  return (
    <Wrapper>
      <ChatButton type="button">
        <FontAwesomeIcon icon={faLink} />
      </ChatButton>
      <ChatButton>
        <CodeIcon icon={faCode} />
      </ChatButton>
      <ChatInputWrapper>
        <TextAreaCustom onInput={onHeight} height={chatHeight} />
      </ChatInputWrapper>
      <ChatEnter>
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
  box-shadow: rgb(0 0 0 / 5%) 0 2px 6px 0;
  padding: 0 15px;
`;

interface TextAreaCustomProps {
  height: number;
}

const TextAreaCustom = styled.textarea<TextAreaCustomProps>`
  padding: 0 10px !important;
  width: 95%;
  overflow: hidden;
  height: ${(props) => props.height}px;
  resize: none;
  line-height: 20px;
  border: 0;
  font-family: inherit;
  font-size: 15px;
  white-space: pre-wrap;

  &:focus {
    outline: 0;
  }
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

const ChatEnter = styled.div`
  margin-left: auto;
  color: #52a7ff;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: #2d79c7;
  }
  
  
  & > svg {
    width: 25px;
    height: 35px;
  }
`;

export default observer(Footer);
