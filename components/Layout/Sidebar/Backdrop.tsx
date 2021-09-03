import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import { MediaQuery } from '@styles';
import * as T from '@types';

const Backdrop = () => {
  const { sidebarStore } = stores();
  const { isOpenSidebar, toggleSidebar } = sidebarStore;

  return <SidebarBackdrop isOpenSidebar={isOpenSidebar} onClick={toggleSidebar} />;
};

interface SidebarProp {
  isOpenSidebar: boolean;
}

const SidebarBackdrop = styled.div<SidebarProp>(({ isOpenSidebar }) => ({
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,

  [MediaQuery[T.Device.LARGE]]: {
    ...(isOpenSidebar ? ({
      zIndex: 1,
      backgroundColor: 'rgba(0,0,0,.5)',
    }) : null),
  },
}));

export default observer(Backdrop);
