import React from 'react';
import styled from '@emotion/styled';
import useStores from '../../../stores/useStores';

const HeaderNoTokenList = () => {
  const { SignStore } = useStores();
  const { toggleSignModal, toggleRegisterModal } = SignStore;

  return (
    <>
      <li>
        <NoStyleA onClick={toggleSignModal}>
          로그인
        </NoStyleA>
      </li>
      <li>
        <NoStyleA onClick={toggleRegisterModal}>
          회원가입
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

export default HeaderNoTokenList;
