import React from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import SideTokenList from './SideTokenList';
import SideNoTokenList from './SideNoTokenList';

const SideTokenMenu: React.FC = () => {
  const { SignStore } = useStores();
  const { userData, cookieChecked } = SignStore;
  const loggedIn = !!userData;

  // 쿠키 내의 토큰 체크가 되기 전
  if (!cookieChecked) {
    return (<></>);
  }

  return loggedIn ? <SideTokenList /> : <SideNoTokenList />;
};

export default observer(SideTokenMenu);
