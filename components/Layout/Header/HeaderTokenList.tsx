import React, {useCallback} from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStores from '@stores/useStores';
import AlertSpinner from './Alert/AlertSpinner';
import AlertList from './Alert/AlertList';

const HeaderTokenList = () => {
  const { SignStore, UtilStore, AlertStore } = useStores();
  const { logout, togglePasswordChangeModal, toggleDeleteUserModal } = SignStore;
  const {
    headerMenu, headerMenuElement, openHeaderMenu, closeHeaderMenu,
  } = UtilStore;
  const { alertNotReadSize, alertLoading } = AlertStore;

  const onLogout = useCallback(() => {
    logout(false);
  }, []);

  return (
    <>
      <li>
        <button type="button" onClick={openHeaderMenu} name="profile">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
        <UserMenu
          anchorEl={headerMenuElement}
          keepMounted
          open={headerMenu === 'profile'}
          onClose={closeHeaderMenu}
        >
          <MenuItem onClick={onLogout}>로그아웃</MenuItem>
          <MenuItem onClick={togglePasswordChangeModal}>비밀번호 변경</MenuItem>
          <MenuItem onClick={toggleDeleteUserModal}>탈퇴하기</MenuItem>
        </UserMenu>
      </li>
      <li>
        <AlertButton type="button" onClick={openHeaderMenu} name="alert">
          <FontAwesomeIcon icon={faBell} />
          {Boolean(alertNotReadSize) && <div>{alertNotReadSize}</div>}
        </AlertButton>
        <AlertMenu
          anchorEl={headerMenuElement}
          keepMounted
          open={headerMenu === 'alert'}
          onClose={closeHeaderMenu}
        >
          <MenuItem>알림 목록</MenuItem>
          {alertLoading ? <AlertSpinner /> : <AlertList />}
        </AlertMenu>
      </li>
    </>
  );
};

const AlertButton = styled.button`
  position: relative;
  
  & > div {
    background-color: red;
    min-width: 18px;
    height: 18px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

const UserMenu = styled(Menu)`
  & > .MuiPaper-root {
    border-radius: 10px;
  }
  
  & ul {
    & > li {
      font-size: 14px;
      font-family: inherit;
      padding: 8px 14px;
    }
  }
`;

const AlertMenu = styled(Menu)`
  white-space: normal !important;
  font-size: 14px;
  
  & > .MuiPaper-root {
    border-radius: 10px;
  }

  & ul {
    padding: 0;
    & > li {
      font-family: inherit;
    }
  }

  & li:first-of-type {
    font-weight: bold;
    font-size: 15px !important;
    padding: 10px;
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
