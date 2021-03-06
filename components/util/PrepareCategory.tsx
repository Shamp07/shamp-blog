import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';

const PrepareCategory = () => (
  <Wrapper>
    <div>
      <div>
        <Icon icon={faBusinessTime} />
      </div>
      <div>
        준비중입니다. 기대해주세요!
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
  height: 94px;
  padding: 243px 0;
  border-radius: 14px;

  @media (max-width: 1064px) {
    border-radius: 0;
  }
  
  & > div {
    text-align: center;
    color: #7b858e;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: #e6e6e6;
  width: 50px;
  height: 50px;
`;

export default PrepareCategory;
