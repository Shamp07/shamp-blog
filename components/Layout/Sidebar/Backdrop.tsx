import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import { MediaQuery } from '@constants/styles';
import * as T from '@types';

const Backdrop = () => {
  const { sidebarStore } = stores();
  const { isOpenSidebar, toggleSidebar } = sidebarStore;

  return <Root isOpen={isOpenSidebar} onClick={toggleSidebar} />;
};

interface OpenProp {
  isOpen: boolean;
}

const Root = styled.div<OpenProp>(({ isOpen }) => ({
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,

  [MediaQuery[T.Device.TABLET]]: {
    ...(isOpen ? ({
      zIndex: 1,
      backgroundColor: 'rgba(0,0,0,.5)',
    }) : null),
  },
}));

export default observer(Backdrop);
