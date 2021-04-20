import React from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';

const ChatSpinner = () => (
  <Wrapper>
    <CircularProgress size={60} />
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #fff;
  height: 656px;
  box-shadow: rgb(81 99 120 / 30%) 0 6px 60px 0;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  text-align: center;
  line-height: 656px;
  
  & svg {
    color: #2d79c7 !important;
  }
`;

export default ChatSpinner;
