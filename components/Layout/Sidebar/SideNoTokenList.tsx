import React from 'react';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';

const SideNoTokenList = () => {
  const { SignStore } = useStores();
  const { toggleSignModal, toggleRegisterModal } = SignStore;

  return (
    <MobileMenu>
      <TopMenu onClick={toggleSignModal}>로그인</TopMenu>
      <TopMenu onClick={toggleRegisterModal}>회원가입</TopMenu>
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

export default SideNoTokenList;
