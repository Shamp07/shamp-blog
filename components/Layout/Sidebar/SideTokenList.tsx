import React from 'react';
import styled from '@emotion/styled';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

const SideTokenList = () => {
  const { SignStore } = useStores() as RootStore;
  const { userData, logout } = SignStore;
  if (!userData) return null;

  const { name } = userData;

  return (
    <MobileMenu>
      <TopMenu>{name}</TopMenu>
      <TopMenu onClick={() => logout(false)}>로그아웃</TopMenu>
    </MobileMenu>
  );
};

const MobileMenu = styled.div`
  display: none;
  height: 40px;
  @media (max-width: 1064px) {
    display: block;
  }
`;

const TopMenu = styled.div`
  width: 40%;
  padding: 10px;
  display: inline-block;
  text-align: center;
  color: #616161;
  font-weight: bold;
  cursor: pointer;
`;

export default SideTokenList;
