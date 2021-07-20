import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import * as T from '@types';
import { MediaQuery } from '@styles';

interface Props {
  children: ReactNode;
}

const Content = ({ children }: Props) => {
  const { SignStore } = useStores();
  const { cookieChecked } = SignStore;

  if (!cookieChecked) return null;

  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  marginLeft: 'auto',
  boxSizing: 'border-box',
  width: '744px',
  marginBottom: '20px',

  [MediaQuery[T.Device.LARGE]]: {
    width: '100%',
  },
});

export default observer(Content);
