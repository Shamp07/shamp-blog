import React from 'react';
import styled from '@emotion/styled';

import { MediaQuery } from '@styles';
import * as T from '@types';
import Logo from './Logo';
import Menu from './Menu';

const Header = () => (
  <header>
    <TopBar>
      <Container>
        <Logo />
        <Menu />
      </Container>
    </TopBar>
  </header>
);

const Container = styled.div({
  display: 'flex',
  height: '70px',
  maxWidth: '1044px',
  margin: '0 auto',

  [MediaQuery[T.Device.LARGE]]: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    height: '56px !important',
  },
});

const TopBar = styled.div({
  height: '70px',
  backgroundImage: 'linear-gradient(94deg, #2d79c7, #52a7ff)',
  color: '#ffffff',

  [MediaQuery[T.Device.LARGE]]: {
    height: '56px !important',
  },
});

export default Header;
