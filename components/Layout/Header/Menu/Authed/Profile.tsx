import React, { MouseEvent } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@mui/material/Avatar';

import stores from '@stores';
import dsPalette from '@constants/ds-palette';

interface MenuObservable {
  element: HTMLButtonElement | null;
  open(event: MouseEvent<HTMLButtonElement>): void;
  close(): void;
}

const Profile = () => {
  const { signStore } = stores();
  const { userData } = signStore;
  if (!userData) return null;

  const menu = useLocalObservable<MenuObservable>(() => ({
    element: null,
    open(event: MouseEvent<HTMLButtonElement>) {
      this.element = event.currentTarget;
    },
    close() {
      this.element = null;
    },
  }));

  const onSignOut = () => signStore.signOut();

  return (
    <>
      <Button onClick={menu.open}>
        <AvatarIcon>{userData.name.substring(0, 1)}</AvatarIcon>
        <FontAwesomeIcon icon={faSortDown} />
      </Button>
      <ProfileMenu
        anchorEl={menu.element}
        open={Boolean(menu.element)}
        onClose={menu.close}
        transitionDuration={0}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ProfileMenuItem onClick={onSignOut}>로그아웃</ProfileMenuItem>
      </ProfileMenu>
    </>
  );
};

const Button = styled.button({
  display: 'flex',
  border: 0,
  cursor: 'pointer',
  marginLeft: '1rem',
  alignItems: 'center',
  background: 'transparent',
  fontFamily: 'inherit',
});

const AvatarIcon = styled(Avatar)({
  marginRight: '.5rem',
  '&&&': {
    fontFamily: 'inherit',
  },
});

const ProfileMenu = styled(Menu)({
  '&&&': {
    '& > .MuiPaper-elevation': {
      color: dsPalette.typePrimary.toString(),
      boxShadow: 'none',
      borderTop: 0,
      marginTop: '11px',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      '& > ul': {
        padding: 0,
        fontSize: '1rem',
      },
    },
  },
});

const ProfileMenuItem = styled(MenuItem)({
  '&&&': {
    fontFamily: 'inherit',
    padding: '12px 16px',
    minWidth: '167px',
  },
});

export default observer(Profile);
