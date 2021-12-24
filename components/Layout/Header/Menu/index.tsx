import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Authed from './Authed';
import Unauthed from './Unauthed';

const Menu = () => {
  const { signStore } = stores();
  const { userData, authChecked } = signStore;
  if (!authChecked) return null;

  const userMenu = userData ? <Authed /> : <Unauthed />;

  return (
    <Root>
      {userMenu}
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
});

export default observer(Menu);
