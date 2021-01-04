import React from 'react';
import styled from 'styled-components';

const Content: React.FC = ({ children }: any) => (
  <Wrapper>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  float: right;
  box-sizing: border-box;
  width: 728px;
  @media (max-width: 1064px) {
    width: 100%;
  }
`;

export default Content;
