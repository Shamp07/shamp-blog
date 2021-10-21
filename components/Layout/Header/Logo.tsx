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
        <Title href="d">shamp07.log</Title>
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
  alignItems: 'center',
});

const Title = styled.a({
  color: dsPalette.themePrimary.toString(),
  fontSize: '1.125rem',
  fontWeight: 500,
  fontFamily: 'Fira Mono',
  marginLeft: '1rem',
  display: 'block',
  maxWidth: 'calc(100vw - 200px)',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export default Logo;
