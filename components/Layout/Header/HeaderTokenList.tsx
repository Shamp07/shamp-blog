import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from './Alert';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';
import { AlertType } from '../../../stores/AlertStore';

const HeaderTokenList = () => {
  const { SignStore, UtilStore, AlertStore } = useStores() as RootStore;
  const { logout, togglePasswordChangeModal, toggleDeleteUserModal } = SignStore;
  const {
    headerMenu, headerMenuElement, openHeaderMenu, closeHeaderMenu,
  } = UtilStore;
  const { alertList } = AlertStore;

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
          <MenuItem key={-1}>새로고침</MenuItem>
          <MenuItem key={0}>모두 확인</MenuItem>
          {alertList.map((data: AlertType) => (
            <Alert key={data.id} data={data} />
          ))}
        </Menu>
      </li>
    </>
  );
};

export default observer(HeaderTokenList);
