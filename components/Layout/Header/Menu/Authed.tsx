import React, { MouseEvent } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import dsPalette from '@constants/ds-palette';
import stores from '@stores';

interface MenuObservable {
  element: HTMLDivElement | null;
  open(event: MouseEvent<HTMLDivElement>): void;
  close(): void;
}

const Authed = () => {
  const { signStore } = stores();
  const { userData } = signStore;
  if (!userData) return null;

  const menu = useLocalObservable<MenuObservable>(() => ({
    element: null,
    open(event: MouseEvent<HTMLDivElement>) {
      this.element = event.currentTarget;
    },
    close() {
      this.element = null;
    },
  }));

  return (
    <Root>
      <Link href="/write" passHref>
        <Posting>글 작성</Posting>
      </Link>
      <Profile
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={menu.element ? 'true' : undefined}
        onClick={menu.open}
      >
        <AvatarIcon>{userData.name.substring(0, 1)}</AvatarIcon>
        <FontAwesomeIcon icon={faSortDown} />
      </Profile>
      <ProfileMenu
        id="basic-menu"
        anchorEl={menu.element}
        open={Boolean(menu.element)}
        onClose={menu.close}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {}}>로그아웃</MenuItem>
      </ProfileMenu>
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

const ProfileMenu = styled(Menu)({
  '&&&': {
    fontFamily: 'inherit',
  },
  '&&& ul': {
    padding: 0,
  },
});

export default observer(Authed);
