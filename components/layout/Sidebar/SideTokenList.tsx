import React from 'react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const SideTokenList: React.FC = () => {
  const { SignStore } = useStores();
  const { userData, logout } = SignStore;
  const { name } = userData;

  return (
    <MobileMenu>
      <TopMenu>{name}</TopMenu>
      <TopMenu onClick={logout}>로그아웃</TopMenu>
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
`;

export default SideTokenList;
