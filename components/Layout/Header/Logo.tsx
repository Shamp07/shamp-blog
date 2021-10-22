import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import * as T from '@types';
import dsPalette from '@constants/ds-palette';
import LogoSVG from '@assets/icon/logo.svg';
import {FontFamily} from "@constants/styles";

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
  alignItems: 'center',
});

const Title = styled.div({
  color: dsPalette.themePrimary.toString(),
  fontSize: '1.3125rem',
  fontWeight: 700,
  fontFamily: FontFamily.PT_SANS,
  marginLeft: '1rem',
});

export default Logo;
