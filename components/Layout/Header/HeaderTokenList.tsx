import React from 'react';
import styled from '@emotion/styled';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

const HeaderTokenList = () => {
  const { SignStore, UtilStore } = useStores() as RootStore;
  const { logout, togglePasswordChangeModal, toggleDeleteUserModal } = SignStore;
  const { profileMenu, toggleProfileMenu } = UtilStore;

  return (
    <>
      <li>
        <NoStyleA onClick={toggleProfileMenu}>
          <FontAwesomeIcon icon={faUser} />
        </NoStyleA>
        <Menu
          anchorEl={profileMenu}
          keepMounted
          open={Boolean(profileMenu)}
          onClose={toggleProfileMenu}
        >
          <MenuItem onClick={togglePasswordChangeModal}>비밀번호 변경</MenuItem>
          <MenuItem onClick={toggleDeleteUserModal}>탈퇴하기</MenuItem>
          <MenuItem onClick={() => logout(false)}>로그아웃</MenuItem>
        </Menu>
      </li>
      <li>
        <NoStyleA>
          <FontAwesomeIcon icon={faBell} />
        </NoStyleA>
      </li>
    </>
  );
};

const NoStyleA = styled.a`
  display: inline-block;
  color: #ffffff;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  font-weight: 500;
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default observer(HeaderTokenList);
