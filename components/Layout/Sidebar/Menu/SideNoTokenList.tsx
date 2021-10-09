import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import stores from '@stores';
import { MediaQuery } from '@styles';
import * as T from '@types';

const SideNoTokenList = () => {
  const { utilStore } = stores();

  const onSignIn = useCallback(() => {
    utilStore.openPopup(T.Popup.SIGN_IN);
  }, []);

  const onSignUp = useCallback(() => {
    utilStore.openPopup(T.Popup.SIGN_UP);
  }, []);

  return (
    <MobileMenu>
      <TopMenu onClick={onSignIn}>로그인</TopMenu>
      <TopMenu onClick={onSignUp}>회원가입</TopMenu>
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
