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
  padding: 18px 0;
  border-bottom: solid 1px #e6e6e6;

  & > h2 {
    padding-left: 16px;
    font-size: 18px;
  }
`;

export default Header;
