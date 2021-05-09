import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

const DefaultUserProfile = () => (
  <Wrapper>
    <div>
      <FontAwesomeIcon icon={faUser} />
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  & > div {
    width: 20px;
    height: 20px;
    padding: 5px;
    background-color: #2d79c7;
    border-radius: 25px;
    color: #fff;
  }

  & svg {
    width: 14px;
    height: 14px;
    padding: 3px;
  }
`;

export default DefaultUserProfile;
