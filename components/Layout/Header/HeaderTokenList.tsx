import React, { useCallback, MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import stores from '@stores';
import * as T from '@types';
import AlertSpinner from './Alert/AlertSpinner';
import AlertList from './Alert/AlertList';

const HeaderTokenList = () => {
  const { signStore, utilStore, alertStore } = stores();
  const {
    headerMenu, headerMenuElement,
  } = utilStore;
  const { alertNotReadSize, alertLoading } = alertStore;

  const onLogout = useCallback(() => {
    signStore.logout(true);
  }, []);

  const onTogglePassword = useCallback(() => {
    utilStore.openPopup(T.Popup.PASSWORD_RESET);
  }, []);

  const onToggleDelete = useCallback(() => {
    utilStore.openPopup(T.Popup.ACCOUNT_DELETE);
  }, []);

  const onProfile = useCallback((event: MouseEvent<HTMLElement>) => {
    utilStore.openHeaderMenu(event);
  }, []);

  const onClose = useCallback(() => {
    utilStore.closeHeaderMenu();
  }, []);

  return (
    <>
      <li>
        <button type="button" onClick={onProfile} name="profile">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
        <UserMenu
          anchorEl={headerMenuElement}
          keepMounted
          open={headerMenu === 'profile'}
          onClose={onClose}
        >
          <MenuItem onClick={onLogout}>로그아웃</MenuItem>
          <MenuItem onClick={onTogglePassword}>비밀번호 변경</MenuItem>
          <MenuItem onClick={onToggleDelete}>탈퇴하기</MenuItem>
        </UserMenu>
      </li>
      <li>
        <AlertButton type="button" onClick={onProfile} name="alert">
          <FontAwesomeIcon icon={faBell} />
          {Boolean(alertNotReadSize) && <div>{alertNotReadSize}</div>}
        </AlertButton>
        <AlertMenu
          anchorEl={headerMenuElement}
          keepMounted
          open={headerMenu === 'alert'}
          onClose={onClose}
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
