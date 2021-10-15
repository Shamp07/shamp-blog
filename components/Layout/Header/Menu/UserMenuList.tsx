import React, { MouseEvent, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Menu from '@material-ui/core/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell, faSignInAlt, faUserCircle, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import MenuItem from '@material-ui/core/MenuItem';

import stores from '@stores';
import * as T from '@types';
import Spinner from './Spinner';
import Alert from './Alert';

const UserMenuList = () => {
  const { signStore, alertStore, utilStore } = stores();
  const { userData, cookieChecked } = signStore;
  const { alerts, isLoading } = alertStore;
  const { menu } = utilStore;
  const { name, element } = menu;

  const toggleSignIn = () => utilStore.openPopup(T.Popup.SIGN_IN);
  const toggleSignUp = () => utilStore.openPopup(T.Popup.SIGN_UP);

  const notReadCount = useMemo(() => alerts.map((data) => !data.readFl).length, [alerts]);

  const onLogout = useCallback(() => {
    signStore.signOut(true);
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

  if (!cookieChecked) return null;

  if (!userData) {
    return (
      <>
        <li>
          <button type="button" onClick={toggleSignIn}>
            <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </li>
        <li>
          <button type="button" onClick={toggleSignUp}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <button type="button" onClick={onProfile} name="profile">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
        <ProfileMenu
          anchorEl={element}
          keepMounted
          open={name === 'profile'}
          onClose={onClose}
        >
          <MenuItem onClick={onLogout}>로그아웃</MenuItem>
          <MenuItem onClick={onTogglePassword}>비밀번호 변경</MenuItem>
          <MenuItem onClick={onToggleDelete}>탈퇴하기</MenuItem>
        </ProfileMenu>
      </li>
      <li>
        <AlertButton type="button" onClick={onProfile} name="alert">
          <FontAwesomeIcon icon={faBell} />
          {Boolean(notReadCount) && <div>{notReadCount}</div>}
        </AlertButton>
        <AlertMenu
          anchorEl={element}
          keepMounted
          open={name === 'alert'}
          onClose={onClose}
        >
          <MenuItem>알림 목록</MenuItem>
          {isLoading ? <Spinner /> : <Alert />}
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

const ProfileMenu = styled(Menu)`
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

export default observer(UserMenuList);
