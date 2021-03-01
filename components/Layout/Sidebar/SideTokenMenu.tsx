import React from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import SideTokenList from './SideTokenList';
import SideNoTokenList from './SideNoTokenList';
import { RootStore } from '../../../stores';

const SideTokenMenu = () => {
  const { SignStore } = useStores() as RootStore;
  const { userData, cookieChecked } = SignStore;
  const loggedIn = !!userData;

  // 쿠키 내의 토큰 체크가 되기 전
  if (!cookieChecked) {
    return null;
  }

  return loggedIn ? <SideTokenList /> : <SideNoTokenList />;
};

export default observer(SideTokenMenu);
