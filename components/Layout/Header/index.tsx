import React from 'react';
import styled from '@emotion/styled';

import * as T from '@types';
import dsPalette from '@constants/ds-palette';
import { MediaQuery } from '@constants/styles';
import Logo from './Logo';
import Menu from './Menu';

const Header = () => (
  <Root>
    <Container>
      <Logo />
      <Menu />
    </Container>
  </Root>
);

const Root = styled.header({
  height: '4rem',
  backgroundColor: dsPalette.themeWhite.toString(),
});

const Container = styled.div({
  display: 'flex',
  width: '1728px',
  height: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  alignItems: 'center',
  justifyContent: 'space-between',

  [MediaQuery[T.Device.DESKTOP]]: {
    width: '1376px',
  },

  [MediaQuery[T.Device.LAPTOP]]: {
    width: '1024px',
  },

  [MediaQuery[T.Device.TABLET]]: {
    width: 'calc(100% - 2rem)',
  },
});

export default Header;
