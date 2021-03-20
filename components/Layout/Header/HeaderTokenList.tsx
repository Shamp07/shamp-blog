import React from 'react';
import styled from '@emotion/styled';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

const HeaderTokenList = () => {
  const { SignStore, UtilStore } = useStores() as RootStore;
  const {
    userData, logout, togglePasswordChangeModal,
    toggleDeleteUserModal,
  } = SignStore;
  const { profileMenu, toggleProfileMenu } = UtilStore;

  if (!userData) {
    return null;
  }

  const { name } = userData;

  return (
    <>
      <li>
        <NoStyleA onClick={toggleProfileMenu}>
          {name}
          {' '}
          님
        </NoStyleA>
        <Menu
          anchorEl={profileMenu}
          keepMounted
          open={Boolean(profileMenu)}
          onClose={toggleProfileMenu}
        >
          <MenuItem onClick={toggleProfileMenu}>알림 조회</MenuItem>
          <MenuItem onClick={togglePasswordChangeModal}>비밀번호 변경</MenuItem>
          <MenuItem onClick={toggleDeleteUserModal}>탈퇴하기</MenuItem>
        </Menu>
      </li>
      <li>
        <NoStyleA onClick={() => logout(false)}>
          로그아웃
        </NoStyleA>
      </li>
    </>
  );
};

const NoStyleA = styled.a`
  display: block;
  color: #ffffff;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  height: 70px;
  font-weight: 500;
  text-align: center;

  &:hover {
    color: #d0d0d0;
  }
`;

export default observer(HeaderTokenList);
