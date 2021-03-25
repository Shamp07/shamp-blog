import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

const HeaderTokenList = () => {
  const { SignStore, UtilStore } = useStores() as RootStore;
  const { logout, togglePasswordChangeModal, toggleDeleteUserModal } = SignStore;
  const { profileMenu, openProfileMenu, closeProfileMenu } = UtilStore;

  return (
    <>
      <li>
        <button type="button" onClick={openProfileMenu} name="profile">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
        <Menu
          anchorEl={profileMenu}
          keepMounted
          open={profileMenu === 'name'}
          onClose={closeProfileMenu}
        >
          <MenuItem onClick={togglePasswordChangeModal}>비밀번호 변경</MenuItem>
          <MenuItem onClick={toggleDeleteUserModal}>탈퇴하기</MenuItem>
          <MenuItem onClick={() => logout(false)}>로그아웃</MenuItem>
        </Menu>
      </li>
      <li>
        <button type="button" onClick={openProfileMenu}>
          <FontAwesomeIcon icon={faBell} />
        </button>
        <Menu
          anchorEl={profileMenu}
          keepMounted
          open={Boolean(profileMenu)}
          onClose={closeProfileMenu}
        >
          <MenuItem>알림이 없습니다.</MenuItem>
        </Menu>
      </li>
    </>
  );
};

export default observer(HeaderTokenList);
