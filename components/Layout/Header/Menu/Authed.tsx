import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import dsPalette from '@constants/ds-palette';
import stores from '@stores';

const Authed = () => {
  const { signStore } = stores();
  const { userData } = signStore;
  if (!userData) return null;

  return (
    <Root>
      <Link href="/write" passHref>
        <Posting>글 작성</Posting>
      </Link>
      <Profile>
        <AvatarIcon>{userData.name.substring(0, 1)}</AvatarIcon>
        <FontAwesomeIcon icon={faSortDown} />
      </Profile>
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Posting = styled.a({
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
});

const Profile = styled.div({
  display: 'flex',
  cursor: 'pointer',
  marginLeft: '1rem',
  alignItems: 'center',
});

const AvatarIcon = styled(Avatar)({
  marginRight: '.5rem',
  '&&&': {
    fontFamily: 'inherit',
  },
});

export default Authed;
