import React from 'react';
import styled from '@emotion/styled';

import { MediaQuery } from '@styles';
import * as T from '@types';
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
});

const Container = styled.div({
  display: 'flex',
  width: '1728px',
  height: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export default Header;
