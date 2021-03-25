import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  const { SignStore } = useStores() as RootStore;
  const { cookieChecked } = SignStore;

  // 쿠키 내의 토큰 체크가 되기 전
  if (!cookieChecked) {
    return null;
  }

  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: auto;
  box-sizing: border-box;
  width: 754px;
  margin-bottom: 20px;
  
  @media (max-width: 1064px) {
    width: 100%;
  }
`;

export default observer(Content);
