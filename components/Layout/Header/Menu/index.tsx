import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

import { MediaQuery } from '@constants/styles';
import * as T from '@types';
import stores from '@stores';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Authed from './Authed';
import Unauthed from './Unauthed';

const GITHUB_URL = 'https://github.com/Shamp07';

const Menu = () => {
  const { sidebarStore, signStore } = stores();
  const { userData } = signStore;
  const onSidebar = () => sidebarStore.toggleSidebar();

  const userMenu = userData ? <Authed /> : <Unauthed />;

  return (
    <Root>
      {userMenu}
      {/*<a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">*/}
      {/*  <Icon icon={faGithubAlt} />*/}
      {/*</a>*/}
      <SidebarButton onClick={onSidebar}>
        <SidebarIcon icon={faBars} />
      </SidebarButton>
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
});

const SidebarButton = styled.div({
  fontSize: '12px',
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

const SidebarIcon = styled(Icon)`
  font-size: 10px;
  height: 20px;
`;

export default Menu;
