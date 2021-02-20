import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import useStores from '../../../stores/useStores';

const Backdrop = () => {
  const { SidebarStore } = useStores();
  const { isOpenSidebar, toggleSidebar } = SidebarStore;
  return (
    <SidebarBackdrop isOpenSidebar={isOpenSidebar} onClick={toggleSidebar} />
  );
};

interface BackdropInterface {
  isOpenSidebar: boolean;
}

const SidebarBackdrop = styled.div<BackdropInterface>`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  @media (max-width: 1064px) {
    z-index: ${(props) => (props.isOpenSidebar ? '1' : '-1')};
    ${(props) => (props.isOpenSidebar ? 'background-color: rgba(0,0,0,.5);' : null)}
  }
`;

export default observer(Backdrop);
