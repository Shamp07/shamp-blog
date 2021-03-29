import React from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';

const AlertSpinner = () => (
  <Wrapper>
    <CircularProgress size={30} />
  </Wrapper>
);

const Wrapper = styled.div`
  text-align: center;
  margin: 10px 0;
  & svg {
    color: #2d79c7 !important;
  }
`;

export default AlertSpinner;
