import React from 'react';
import { observer } from 'mobx-react-lite';

import useStores from '@stores/useStores';
import SideTokenList from './SideTokenList';
import SideNoTokenList from './SideNoTokenList';

const SideTokenMenu = () => {
  const { SignStore } = useStores();
  const { userData, cookieChecked } = SignStore;

  // 쿠키 내의 토큰 체크가 되기 전
  if (!cookieChecked) return null;

  return userData ? <SideTokenList /> : <SideNoTokenList />;
};

export default observer(SideTokenMenu);
