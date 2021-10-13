import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

import { MediaQuery } from '@styles';
import * as T from '@types';
import stores from '@stores';
import dsPalette from '@constants/ds-palette';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import HeaderTokenMenu from './HeaderTokenMenu';

const Menu = () => {
  const { sidebarStore } = stores();
  const onSidebar = useCallback(() => {
    sidebarStore.toggleSidebar();
  }, []);

  return (
    <Root>
      <Wrapper>
        <RightList>
          <HeaderTokenMenu />
          <li>
            <a href="https://github.com/Shamp07">
              <FontAwesomeIcon icon={faGithubAlt} />
            </a>
          </li>
        </RightList>
      </Wrapper>
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

const RightList = styled.ul({
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

const SidebarIcon = styled(FontAwesomeIcon)`
  font-size: 10px;
  height: 20px;
`;

export default Menu;
