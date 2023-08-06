import React, { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@mui/material/Avatar';

import stores from '@stores';
import dsPalette from '@constants/ds-palette';
import { Page } from '@utilities/route';

interface MenuObservable {
  element: HTMLButtonElement | null;
  open(event: MouseEvent<HTMLButtonElement>): void;
  close(): void;
}

const Profile = () => {
  const router = useRouter();

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
  const onTemporaryPost = () => {
    menu.close();
    router.push(Page.TEMPORARIES);
  };

  const temporaryPostItem = userData.adminFl ? (
    <ProfileMenuItem onClick={onTemporaryPost}>임시 글</ProfileMenuItem>
  ) : null;

  return (
    <>
      <Button onClick={menu.open}>
        <AvatarIcon>{userData.name.substring(0, 1)}</AvatarIcon>
        <SortDownIcon icon={faSortDown} />
      </Button>
      <ProfileMenu
        anchorEl={menu.element}
        open={Boolean(menu.element)}
        onClose={menu.close}
        transitionDuration={0}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {temporaryPostItem}
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

  '&:hover': {
    '& > svg': {
      color: dsPalette.typePrimary.toString(),
    },
  },
});

const AvatarIcon = styled(Avatar)({
  marginRight: '.5rem',
  '&&&': {
    fontFamily: 'inherit',
  },
});

const SortDownIcon = styled(FontAwesomeIcon)({
  color: dsPalette.typeSecond.toString(),
});

const ProfileMenu = styled(Menu)({
  '&&&': {
    '& > .MuiPaper-elevation': {
      boxShadow: 'rgb(0 0 0 / 10%) 0 5px 8px',
      color: dsPalette.typePrimary.toString(),
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
