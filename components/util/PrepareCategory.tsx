import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';

import { MediaQuery } from '@constants/styles';
import * as T from '@types';

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

const Wrapper = styled.div({
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  height: '94px',
  padding: '243px 0',
  borderRadius: '14px',

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },

  '& > div': {
    textAlign: 'center',
    color: '#7b858e',
  },
});

const Icon = styled(FontAwesomeIcon)`
  color: #e6e6e6;
  width: 50px;
  height: 50px;
`;

export default PrepareCategory;
