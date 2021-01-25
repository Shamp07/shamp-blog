import React from 'react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const SideNoTokenList: React.FC = () => {
  const { SignStore } = useStores();
  const { openSignModal } = SignStore;

  return (
    <MobileMenu>
      <TopMenu onClick={openSignModal}>로그인</TopMenu>
      <TopMenu>회원가입</TopMenu>
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

export default SideNoTokenList;
