import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';
import { MediaQuery } from "@styles";
import * as T from '@types';

const HeaderSidebarButton = () => {
  const { SidebarStore } = stores();
  const { toggleSidebar } = SidebarStore;

  return (
    <SidebarWrapper>
      <SidebarButton onClick={toggleSidebar}>
        <MenuIcon icon={faBars} />
      </SidebarButton>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  font-size: 12px;
`;

const SidebarButton = styled.div({
  display: 'none',
  padding: '7px 10px 5px 10px',
  border: '#ffffff solid 1px',
  borderRadius: '5px',
  margin: '9px 10px 0 0',
  cursor: 'pointer',
  transition: 'all 0.2s',

  [MediaQuery[T.Device.LARGE]]: {
    display: 'inline-block',
  },
});

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 10px;
  height: 20px;
`;

export default HeaderSidebarButton;
