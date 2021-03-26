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
  const { headerMenu, headerMenuElement, openHeaderMenu, closeHeaderMenu } = UtilStore;

  return (
    <>
      <li>
        <button type="button" onClick={openHeaderMenu} name="profile">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
        <Menu
          anchorEl={headerMenuElement}
          keepMounted
          open={headerMenu === 'profile'}
          onClose={closeHeaderMenu}
        >
          <MenuItem onClick={togglePasswordChangeModal}>비밀번호 변경</MenuItem>
          <MenuItem onClick={toggleDeleteUserModal}>탈퇴하기</MenuItem>
          <MenuItem onClick={() => logout(false)}>로그아웃</MenuItem>
        </Menu>
      </li>
      <li>
        <button type="button" onClick={openHeaderMenu} name="alert">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <Menu
          anchorEl={headerMenuElement}
          keepMounted
          open={headerMenu === 'alert'}
          onClose={closeHeaderMenu}
        >
          <MenuItem>포스팅에 댓글이 달렸습니다.</MenuItem>
          <MenuItem>댓글에 답글이 달렸습니다.</MenuItem>
        </Menu>
      </li>
    </>
  );
};

export default observer(HeaderTokenList);
