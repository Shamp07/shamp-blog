import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

const CommonNone: React.FC = () => (
  <li>
    <NoneWrapper>
      <FootprintIcon icon={faShoePrints} />
      <br />
      등록된 발자취가 없습니다.
    </NoneWrapper>
  </li>
);

const NoneWrapper = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #7b858e;
  font-size: 14px;
`;

const FootprintIcon = styled(FontAwesomeIcon)`
  width: 30px;
  height: 30px;
  color: #e6e6e6;
  margin-bottom: 15px;
`;

export default CommonNone;
