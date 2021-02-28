import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

const HeaderSidebarButton = () => {
  const { SidebarStore } = useStores() as RootStore;
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

const SidebarButton = styled.div`
  display: none;
  padding: 7px 10px 5px 10px;
  border: #ffffff solid 1px;
  border-radius: 5px;
  margin: 9px 10px 0 0;
  cursor: pointer;
  transition: all 0.2s;
  
  @media (max-width: 1064px) {
    display: inline-block;
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 10px;
  height: 20px;
`;

export default HeaderSidebarButton;
