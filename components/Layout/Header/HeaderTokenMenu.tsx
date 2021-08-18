import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import HeaderTokenList from './HeaderTokenList';
import HeaderNoTokenList from './HeaderNoTokenList';

const HeaderTokenMenu = () => {
  const { SignStore } = stores();
  const { userData, cookieChecked } = SignStore;

  if (!cookieChecked) return null;

  return userData ? <HeaderTokenList /> : <HeaderNoTokenList />;
};

export default observer(HeaderTokenMenu);
