import React from 'react';
import styled from 'styled-components';

const Content: React.FC = () => (
  <Wrapper>
    컨텐츠
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  float: right;
  box-sizing: border-box;
  width: 728px;
  height: 100vh;
  @media (max-width: 1064px) {
    width: 100%;
  }
`;

export default Content;
