import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';

const Content: React.FC = ({ children }: any) => {
  const { SignStore } = useStores();
  const { cookieChecked } = SignStore;

  // 쿠키 내의 토큰 체크가 되기 전
  if (!cookieChecked) {
    return (<></>);
  }

  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  float: right;
  box-sizing: border-box;
  width: 728px;
  
  @media (max-width: 1064px) {
    width: 100%;
  }
`;

export default observer(Content);
