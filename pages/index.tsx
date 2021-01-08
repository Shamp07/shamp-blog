import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Pages = () => (
  <Wrapper>
    홈 페이지 입니다.
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`;

export default observer(Pages);
