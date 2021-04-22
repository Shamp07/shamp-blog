import React from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';

const ChatSpinner = () => (
  <Wrapper>
    <CircularProgress size={60} />
  </Wrapper>
);

const Wrapper = styled.div`
  height: 649px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  text-align: center;
  line-height: 649px;
  
  & svg {
    color: #2d79c7 !important;
  }
`;

export default ChatSpinner;
