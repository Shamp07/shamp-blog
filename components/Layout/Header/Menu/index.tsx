import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { MediaQuery } from '@constants/styles';
import * as T from '@types';
import stores from '@stores';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Authed from './Authed';
import Unauthed from './Unauthed';

const Menu = () => {
  const { sidebarStore, signStore } = stores();
  const { userData, authChecked } = signStore;
  if (!authChecked) return null;

  // const onSidebar = () => sidebarStore.toggleSidebar();

  const userMenu = userData ? <Authed /> : <Unauthed />;

  return (
    <Root>
      {userMenu}
      {/* <SidebarButton onClick={onSidebar}> */}
      {/*  <SidebarIcon icon={faBars} /> */}
      {/* </SidebarButton> */}
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
});

// const SidebarButton = styled.div({
//   fontSize: '12px',
//   display: 'none',
//   padding: '7px 10px 5px 10px',
//   border: '#ffffff solid 1px',
//   borderRadius: '5px',
//   margin: '9px 10px 0 0',
//   cursor: 'pointer',
//   transition: 'all 0.2s',
//
//   [MediaQuery[T.Device.TABLET]]: {
//     display: 'inline-block',
//   },
// });
//
// const SidebarIcon = styled(Icon)`
//   font-size: 10px;
//   height: 20px;
// `;

export default observer(Menu);
