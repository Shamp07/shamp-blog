import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';
import AlertSpinner from './Alert/AlertSpinner';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';
import AlertList from './Alert/AlertList';

const HeaderTokenList = () => {
  const { SignStore, UtilStore, AlertStore } = useStores() as RootStore;
  const { logout, togglePasswordChangeModal, toggleDeleteUserModal } = SignStore;
  const {
    headerMenu, headerMenuElement, openHeaderMenu, closeHeaderMenu,
  } = UtilStore;
  const { alertList, alertLoading } = AlertStore;

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
        <MenuCustom
          anchorEl={headerMenuElement}
          keepMounted
          open={headerMenu === 'alert'}
          onClose={closeHeaderMenu}
        >
          <MenuItem>알림 목록</MenuItem>
          {alertLoading ? <AlertSpinner /> : <AlertList />}
          {alertList.length > 0 && (
            <MenuItem>
              <span>더 보기</span>
            </MenuItem>
          )}
        </MenuCustom>
      </li>
    </>
  );
};

const MenuCustom = styled(Menu)`
  white-space: normal !important;
  
  & ul {
    padding: 0;
  }

  & li:first-of-type {
    font-weight: bold;
    font-size: 15px !important;
  }
  
  & li:first-of-type, & li:last-of-type {
    width: 300px;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    cursor: default;
  }
  
  & li:last-of-type {
    cursor: pointer;
    font-weight: 300;
    & > span {
      margin: auto;  
    }
  }
`;

export default observer(HeaderTokenList);
