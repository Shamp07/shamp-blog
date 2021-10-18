import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import * as T from '@types';
import dsPalette from '@constants/ds-palette';
import LogoSVG from '@assets/icon/logo.svg';

const Logo = () => (
  <Root>
    <Link href={T.CategoryPath.HOME}>
      <Wrapper>
        <LogoSVG />
        <Title>Shamp Blog</Title>
      </Wrapper>
    </Link>
  </Root>
);

const Root = styled.div({
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
});

const Wrapper = styled.div({
  display: 'flex',
});

const Title = styled.div({
  color: dsPalette.themePrimary.toString(),
  fontSize: '25px',
  fontWeight: 700,
  fontFamily: 'Roboto Slab',
  marginLeft: '1rem',
});

export default Logo;
