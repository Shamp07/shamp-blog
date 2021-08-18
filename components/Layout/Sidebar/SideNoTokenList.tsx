import React from 'react';
import styled from '@emotion/styled';

import stores from '@stores';
import { MediaQuery } from '@styles';
import * as T from '@types';

const SideNoTokenList = () => {
  const { SignStore } = stores();
  const { toggleSignModal, toggleRegisterModal } = SignStore;

  return (
    <MobileMenu>
      <TopMenu onClick={toggleSignModal}>로그인</TopMenu>
      <TopMenu onClick={toggleRegisterModal}>회원가입</TopMenu>
    </MobileMenu>
  );
};

const MobileMenu = styled.div({
  display: 'none',
  height: '44px',

  [MediaQuery[T.Device.LARGE]]: {
    display: 'block',
  },
});

const TopMenu = styled.div`
  width: 40%;
  padding: 10px;
  display: inline-block;
  text-align: center;
  color: #616161;
  font-weight: bold;
  cursor: pointer;
`;

export default SideNoTokenList;
