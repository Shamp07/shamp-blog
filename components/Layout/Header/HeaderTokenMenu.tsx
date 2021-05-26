import React from 'react';
import { observer } from 'mobx-react-lite';

import useStores from '@stores/useStores';
import HeaderTokenList from './HeaderTokenList';
import HeaderNoTokenList from './HeaderNoTokenList';

const HeaderTokenMenu = () => {
  const { SignStore } = useStores();
  const { userData, cookieChecked } = SignStore;

  if (!cookieChecked) return null;

  return userData ? <HeaderTokenList /> : <HeaderNoTokenList />;
};

export default observer(HeaderTokenMenu);
