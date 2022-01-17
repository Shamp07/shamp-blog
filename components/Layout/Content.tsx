import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import * as T from '@types';
import { MediaQuery } from '@constants/styles';

interface Props {
  children: ReactNode;
}

const Content = ({ children }: Props) => (
  <CenterContent>
    {children}
  </CenterContent>
);

const CenterContent = styled.div({
  display: 'flex',
  height: 'inherit',
  justifyContent: 'center',

  [MediaQuery[T.Device.TABLET]]: {
    width: '100%',
  },
});

export default observer(Content);
