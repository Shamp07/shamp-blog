import React from 'react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const HeaderTokenList: React.FC = () => {
  const { SignStore } = useStores();
  const { userData, logout } = SignStore;
  const { name } = userData;

  return (
    <>
      <li>
        <NoStyleA>
          {name}
          {' '}
          님
        </NoStyleA>
      </li>
      <li>
        <NoStyleA onClick={logout}>
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

export default HeaderTokenList;
