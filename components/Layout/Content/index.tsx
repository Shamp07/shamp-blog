import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';

interface Props {
  children: ReactNode;
}

const Content = ({ children }: Props) => {
  const { SignStore } = useStores();
  const { cookieChecked } = SignStore;

  // 쿠키 내의 토큰 체크가 되기 전
  if (!cookieChecked) return null;

  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: auto;
  box-sizing: border-box;
  width: 744px;
  margin-bottom: 20px;
  
  @media (max-width: 1064px) {
    width: 100%;
  }
`;

export default observer(Content);
