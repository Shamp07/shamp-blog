import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCode, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Footer = () => (
  <Wrapper>
    <ChatButton type="button">
      <FontAwesomeIcon icon={faLink} />
    </ChatButton>
    <ChatButton>
      <FontAwesomeIcon icon={faCode} />
    </ChatButton>
    <ChatInputWrapper>
      <textarea />
    </ChatInputWrapper>
    <ChatEnter>
      <FontAwesomeIcon icon={faCaretRight} />
    </ChatEnter>
  </Wrapper>
);

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

const ChatButton = styled.button`
  border: 0;
  background-color: transparent;
  color: #d6d6d6;
  margin-right: 2px;
  
  & > svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const ChatInputWrapper = styled.div`
  width: 100%;
  padding: 18px 0;
  height: 20px;
  
  & > textarea {
    width: 95%;
    height: 20px;
    padding: 0;
    resize: none;
    border: 0;
    font-family: inherit;
    font-size: 15px;
    white-space: pre-wrap;
    
    &:focus {
      outline: 0;
    }
  }
`;

const ChatEnter = styled.div`
  margin-left: auto;
  color: #d6d6d6;
  
  & > svg {
    width: 30px;
    height: 35px;
  }
`;

export default Footer;
