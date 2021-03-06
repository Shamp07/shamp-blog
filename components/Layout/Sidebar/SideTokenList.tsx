import React from 'react';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import * as T from '@types';
import { MediaQuery } from '@styles';

const SideTokenList = () => {
  const { SignStore } = useStores();
  const { userData, logout } = SignStore;

  return (
    <MobileMenu>
      <TopMenu>{userData?.name}</TopMenu>
      <TopMenu onClick={() => logout(false)}>로그아웃</TopMenu>
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

export default SideTokenList;
