import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import dsPalette from '@constants/ds-palette';

const Authed = () => (
  <Root>
    <Link href="/write" passHref>
      <Posting>글 작성</Posting>
    </Link>
    <div>
      <div>이미지</div>

    </div>
  </Root>
);

const Root = styled.div({
  display: 'flex',
});

const Posting = styled.a({
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

export default Authed;
