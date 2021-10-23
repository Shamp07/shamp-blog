import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

import { MediaQuery } from '@constants/styles';
import * as T from '@types';
import stores from '@stores';
import dsPalette from '@constants/ds-palette';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import UserMenuList from './UserMenuList';

const GITHUB_URL = 'https://github.com/Shamp07';

const Menu = () => {
  const { sidebarStore } = stores();
  const onSidebar = () => sidebarStore.toggleSidebar();

  return (
    <Root>
      <List>
        <UserMenuList />
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <Icon icon={faGithubAlt} />
        </a>
      </List>
      <SidebarButton onClick={onSidebar}>
        <SidebarIcon icon={faBars} />
      </SidebarButton>
    </Root>
  );
};

const Root = styled.div`
  display: inline-flex;
  margin-left: auto;
`;

const Wrapper = styled.div({
  display: 'inline-block',
  width: '165px',
  height: '70px',

  [MediaQuery[T.Device.LARGE]]: {
    display: 'none',
  },
});

const List = styled.ul({
  listStyle: 'none',
  display: 'inline-flex',
  width: '100%',
  height: '70px',

  '& > li': {
    width: '55px',
    height: '70px',
    lineHeight: '70px',
    display: 'inline-block',
    textAlign: 'center',
  },

  '& > li > a, & > li > button': {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    margin: '10px 0',
    color: '#fff',
    borderRadius: '25px',
    transition: 'background-color 0.2s',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
  },

  '& > li > button': {
    border: 0,
    padding: 0,
    backgroundColor: 'transparent',

    '&:focus': {
      outline: 0,
    },
  },

  '& svg': {
    padding: '12px',
    width: '25px',
    height: '25px',
    color: dsPalette.typeWhite.toString(),
  },
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
