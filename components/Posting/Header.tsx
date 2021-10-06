import React from 'react';
import styled from '@emotion/styled';

const Header = () => (
  <Root>
    <SubTitle>
      <h2>글 작성</h2>
    </SubTitle>
  </Root>
);

const Root = styled.div`
  background-color: #fff;
  line-height: 1;
`;

const SubTitle = styled.div`
  font-size: 18px;
  padding-bottom: 18px;
  
  & > h2 {
    font-size: 18px;
  }
`;

export default Header;
