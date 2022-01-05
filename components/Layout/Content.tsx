import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';
import { MediaQuery } from '@constants/styles';

interface Props {
  children: ReactNode;
}

const Content = ({ children }: Props) => {
  const { signStore } = stores();
  const { authChecked } = signStore;

  if (!authChecked) return null;

  return (
    <CenterContent>
      {children}
    </CenterContent>
  );
};

const CenterContent = styled.div({
  display: 'flex',
  height: 'inherit',
  justifyContent: 'center',

  [MediaQuery[T.Device.TABLET]]: {
    width: 'calc(100% - 2rem)',
    margin: 'auto 1rem',
  },
});

export default observer(Content);
