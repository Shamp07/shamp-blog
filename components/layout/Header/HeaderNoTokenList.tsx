import React from 'react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const HeaderNoTokenList: React.FC = () => {
  const { SignStore } = useStores();
  const { openSignModal } = SignStore;

  return (
    <>
      <li>
        <NoStyleA onClick={openSignModal}>
          로그인
        </NoStyleA>
      </li>
      <li>
        <NoStyleA>
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
