import React, { MouseEvent } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@mui/material/Avatar';

import stores from '@stores';

interface MenuObservable {
  element: HTMLDivElement | null;
  open(event: MouseEvent<HTMLDivElement>): void;
  close(): void;
}

const Profile = () => {
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
    <>
      <Button
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={menu.element ? 'true' : undefined}
        onClick={menu.open}
      >
        <AvatarIcon>{userData.name.substring(0, 1)}</AvatarIcon>
        <FontAwesomeIcon icon={faSortDown} />
      </Button>
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
    </>
  );
};

const Button = styled.div({
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
  '&&& ul': {
    padding: 0,
  },
});

export default observer(Profile);
