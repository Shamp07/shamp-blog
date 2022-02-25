import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import LogoSVG from '@assets/icon/logo.svg';
import LogoTitleSVG from '@assets/icon/logo-title.svg';
import { Page } from '@utilities/route';

const Logo = () => (
  <Root>
    <Link href={Page.HOME} passHref>
      <Wrapper>
        <LogoSVG />
        <LogoTitleSVG />
      </Wrapper>
    </Link>
  </Root>
);

const Root = styled.div({
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
});

const Wrapper = styled.a({
  display: 'flex',
  alignItems: 'center',
  textDecorationLine: 'none',

  '& > svg:last-of-type': {
    marginLeft: '1rem',
  },
});

export default Logo;
