import React, { useCallback } from 'react';
import stores from '@stores';
import { observer } from 'mobx-react-lite';

import styled from '@emotion/styled';
import { MediaQuery } from '@styles';
import * as T from '@types';

const Menu = () => {
  const { signStore, utilStore } = stores();
  const { userData, cookieChecked } = signStore;

  const onSignIn = useCallback(() => {
    utilStore.openPopup(T.Popup.SIGN_IN);
  }, []);

  const onSignUp = useCallback(() => {
    utilStore.openPopup(T.Popup.SIGN_UP);
  }, []);

  const onSignOut = useCallback(() => {
    signStore.signOut(false);
  }, []);

  if (!cookieChecked) return null;

  if (userData) {
    return (
      <Root>
        <TopMenu>{userData.name}</TopMenu>
        <TopMenu onClick={onSignOut}>로그아웃</TopMenu>
      </Root>
    );
  }

  return (
    <Root>
      <TopMenu onClick={onSignIn}>로그인</TopMenu>
      <TopMenu onClick={onSignUp}>회원가입</TopMenu>
    </Root>
  );
};

const Root = styled.div({
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

export default observer(Menu);
