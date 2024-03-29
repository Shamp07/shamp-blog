import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import stores from '@stores';
import dsPalette from '@constants/ds-palette';
import { MediaQuery } from '@constants/styles';
import * as T from '@types';
import { Page } from '@utilities/route';
import Profile from './Profile';

const Authed = () => {
  const { signStore } = stores();
  const { userData } = signStore;

  const writeButton = userData?.adminFl ? (
    <Link href={Page.WRITE} passHref>
      <Write>글 작성</Write>
    </Link>
  ) : null;

  return (
    <Root>
      {writeButton}
      <Profile />
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Write = styled.a({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  cursor: 'pointer',
  background: dsPalette.themeWhite.toString(),
  color: dsPalette.themePrimary.toString(),
  paddingLeft: '1rem',
  paddingRight: '1rem',
  height: '2rem',
  borderRadius: '1rem',
  border: `1px solid ${dsPalette.themePrimary.toString()}`,
  fontWeight: 700,
  textDecoration: 'none',

  '&:hover': {
    color: dsPalette.typeWhite.toString(),
    background: dsPalette.themePrimary.toString(),
    transition: 'all .125s ease-in 0s',
  },

  [MediaQuery[T.Device.MOBILE]]: {
    display: 'none',
  },
});

export default Authed;
