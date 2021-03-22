import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

const HeaderNoTokenList = () => {
  const { SignStore } = useStores() as RootStore;
  const { toggleSignModal, toggleRegisterModal } = SignStore;

  return (
    <>
      <li>
        <NoStyleA onClick={toggleSignModal}>
          <FontAwesomeIcon icon={faGithubAlt} />
        </NoStyleA>
      </li>
      <li>
        <NoStyleA onClick={toggleRegisterModal}>
          <FontAwesomeIcon icon={faUser} />
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
  font-weight: 500;
  text-align: center;
  border-radius: 3px;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export default HeaderNoTokenList;
