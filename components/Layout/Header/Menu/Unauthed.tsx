import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import dsPalette from '@constants/ds-palette';
import { Page } from '@utilities/route';

const Unauthed = () => (
  <Link href={Page.SIGN_IN} passHref>
    <Root>로그인</Root>
  </Link>
);

const Root = styled.a({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  cursor: 'pointer',
  background: dsPalette.themePrimary.toString(),
  color: dsPalette.themeWhite.toString(),
  paddingLeft: '1rem',
  paddingRight: '1rem',
  height: '2rem',
  borderRadius: '1rem',
  fontWeight: 700,
  textDecoration: 'none',
});

export default Unauthed;
