import React from 'react';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';
import { MediaQuery } from '@constants/styles';
import * as T from '@types';

const NotExist = () => (
  <Root>
    <Wrapper>
      <NotFound>404</NotFound>
      <Description>
        삭제되었거나 존재하지 않는 글입니다.
      </Description>
    </Wrapper>
  </Root>
);

const Root = styled.div({
  height: 'calc(100vh - 64px)',
  color: dsPalette.typePrimary.toString(),
  display: 'flex',
  alignItems: 'center',
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Description = styled.div({
  textAlign: 'center',
  fontSize: '2rem',
  wordBreak: 'keep-all',
  margin: '0 1rem',

  [MediaQuery[T.Device.TABLET]]: {
    fontSize: '1.25rem',
  },
});

const NotFound = styled.div({
  fontSize: '6rem',
  textAlign: 'center',

  [MediaQuery[T.Device.TABLET]]: {
    fontSize: '5rem',
  },
});

export default NotExist;
