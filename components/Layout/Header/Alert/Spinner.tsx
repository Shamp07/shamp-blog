import React from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';

const Spinner = () => (
  <Root>
    <CircularProgress size={30} />
  </Root>
);

const Root = styled.div`
  text-align: center;
  margin: 10px 0;
  & svg {
    color: #2d79c7 !important;
  }
`;

export default Spinner;
