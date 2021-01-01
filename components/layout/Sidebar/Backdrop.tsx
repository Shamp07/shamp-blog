import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const Backdrop: React.FC = () => {
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
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  @media (max-width: 1064px) {
    z-index: ${(props) => (props.isOpenSidebar ? '1' : '-1')};
    ${(props) => (props.isOpenSidebar ? 'background-color: rgba(0,0,0,.5);' : null)}
  }
`;

export default observer(Backdrop);
