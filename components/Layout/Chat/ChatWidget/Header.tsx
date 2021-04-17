import React from 'react';
import styled from '@emotion/styled';

const Header = () => (
  <HeaderWrapper>
    채팅 방 목록
  </HeaderWrapper>
);

const HeaderWrapper = styled.header`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  height: 30px;
  text-align: center;
  padding: 10px;
  line-height: 30px;
  border-bottom: 1px solid #e6e6e6;
  background: linear-gradient(94deg, #2d79c7, #52a7ff);
  box-shadow: rgb(81 99 120 / 30%) 0 6px 60px 0;
  color: #fff;
`;

export default Header;
